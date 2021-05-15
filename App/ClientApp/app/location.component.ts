import {
    Component,
    ElementRef,
    ViewChild,

    HostListener
} from '@angular/core';
import { Room } from './Room';
import { TypeTechnique } from './TypeTechnique';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Technique } from './technique';
import { TechniqueService } from './technique.service';
import { LocationService } from './location.service';
import { techniqueAndType } from './techniquAndType';
import { locationPoint } from './locationPoint';

@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    providers: [TechniqueService, LocationService]
})

export class LocationComponent {
    @ViewChild('canvas', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;
    canvasEl: HTMLCanvasElement;
    myForm: FormGroup;
    myFormRoom: FormGroup;
    room: Room = new Room();
    typeTechnique: TypeTechnique = new TypeTechnique();
    typeTechniques: TypeTechnique[];
    technique: Technique = new Technique();
    techniqueOnDb: Technique[];
    techniques: Technique[];
    techniquesForDelete: Technique[];
    previousSelectedTechnique: techniqueAndType;
    location: locationPoint = new locationPoint(20, 20);
    //list: Map<Room, Map<Technique, TypeTechnique>>;
    list: Room[];
    //listTechnique: Map<Technique, TypeTechnique>;
    listTechnique: techniqueAndType[];
    ofstLeft: number;
    ofstTop: number;
    disabledSave: boolean = true;
    disabledAddLocation: boolean = true;
    dilableInput: boolean = false;
    private ctx: CanvasRenderingContext2D;
    searchStr = '';
    isDragging: boolean = false;
    color: string = 'gray';
    selectTechnique: techniqueAndType;
    showTech: boolean = false;
    nameLayer: techniqueAndType[];
    showBlock: boolean = false;
    public showBlockHidden() {
        this.showBlock = !this.showBlock;
    }
    constructor(private techniqueService: TechniqueService, private locationService: LocationService) {
        //this.list = new Map<Room, Map<Technique, TypeTechnique>>();
        this.list = [];
        this.listTechnique = [];
        this.techniques = [];
        this.techniquesForDelete = [];
        this.nameLayer = [];
    }
    initForm() {
        this.myForm = new FormGroup({

            "Name": new FormControl("", Validators.required),
            "Length": new FormControl("", [Validators.required, Validators.max(this.canvasEl.height - 20), Validators.min(20)]),
            "Width": new FormControl("", [Validators.required, Validators.max(this.canvasEl.width - 20), Validators.min(20)]),
            "Technique": new FormControl("", Validators.required),
            "LengthTechnique": new FormControl("", [Validators.required, Validators.max(this.room.length - 40), Validators.min(1)]),
            "WidthTechnique": new FormControl("", [Validators.required, Validators.max(this.room.width - 40), Validators.min(1)]),
            "LayerTechnique": new FormControl("", Validators.required),
            "ColorTechnique": new FormControl("", Validators.required)
        });
        this.myFormRoom = new FormGroup({

            "Name": new FormControl("", Validators.required),
            "Length": new FormControl("", [Validators.required, Validators.max(this.canvasEl.height - 20), Validators.min(20)]),
            "Width": new FormControl("", [Validators.required, Validators.max(this.canvasEl.width - 20), Validators.min(20)])
        });
    }
    UpdateForm() {
        this.myForm = new FormGroup({
            "Name": new FormControl("", Validators.required),
            "Length": new FormControl("", [Validators.required, Validators.max(this.canvasEl.height - 20), Validators.min(20)]),
            "Width": new FormControl("", [Validators.required, Validators.max(this.canvasEl.width - 20), Validators.min(20)]),
            "Technique": new FormControl("", Validators.required),
            "LengthTechnique": new FormControl("", [Validators.required, Validators.max(this.room.length - 40), Validators.min(1)]),
            "WidthTechnique": new FormControl("", [Validators.required, Validators.max(this.room.width - 40), Validators.min(1)]),
            "LayerTechnique": new FormControl("", Validators.required),
            "ColorTechnique": new FormControl("", Validators.required)
        });
    }
    UpdateFormRoom() {
        this.myFormRoom = new FormGroup({
            "Name": new FormControl("", Validators.required),
            "Length": new FormControl("", [Validators.required, Validators.max(this.canvasEl.height - 20), Validators.min(20)]),
            "Width": new FormControl("", [Validators.required, Validators.max(this.canvasEl.width - 20), Validators.min(20)])
        });
    }
    ngOnInit(): void {
        this.canvasEl = this.canvas.nativeElement;
        this.ofstLeft = this.canvas.nativeElement.offsetLeft;
        this.ofstTop = this.canvas.nativeElement.offsetTop;
        this.ctx = this.canvasEl.getContext('2d');
        this.canvasEl.width = window.innerWidth * 0.8;
        this.canvasEl.height = window.innerHeight * 0.8;
        //this.canvasEl.onclick = this.canvasClick;
        this.canvasEl.onmousedown = this.canvasClick;
        this.canvasEl.onmouseup = this.stopDragging;
        this.canvasEl.onmouseout = this.stopDragging;
        this.canvasEl.onmousemove = this.dragTechnique;
        this.initForm();
        this.typeTechniques = [];
        this.loadTechnique();
    }

    stopDragging() {
        this.isDragging = false;
    }
    closeT(e: any) {
        this.typeTechnique = new TypeTechnique();
        this.technique = new Technique();
        this.showTech = false;
    }
    showTechnique(e: any) {
        var clickX = e.pageX - this.canvas.nativeElement.offsetLeft;
        var clickY = e.pageY - this.canvas.nativeElement.offsetTop;
        for (var i = this.listTechnique.length - 1; i >= 0; i--) {
            var technique = this.listTechnique[i];
            if ((clickX - (-(this.scale - 1) * this.canvasEl.width / 2)) >= (technique.typeTechnique.point.x * this.scale) && (clickY - (-(this.scale - 1) * this.canvasEl.height / 2)) >= (technique.typeTechnique.point.y * this.scale) && (clickX - (-(this.scale - 1) * this.canvasEl.width / 2)) <= ((technique.typeTechnique.point.x + technique.typeTechnique.length) * this.scale) && (clickY - (-(this.scale - 1) * this.canvasEl.height / 2)) <= ((technique.typeTechnique.point.y + technique.typeTechnique.width) * this.scale)) {
                this.showTech = true;
            }

        }
    }
    dragTechnique(e: any) {
        if (this.isDragging == true) {
            // Сохраняем позицию мыши
            var x = e.pageX - this.canvas.nativeElement.offsetLeft;
            var y = e.pageY - this.canvas.nativeElement.offsetTop;
            if (x < (((this.canvasEl.width / 2) + (this.room.width / 2)) - this.previousSelectedTechnique.typeTechnique.width) && x > ((this.canvasEl.width / 2) - this.room.width / 2) + 1 && y < ((this.canvasEl.height / 2) + (this.room.length / 2) - this.previousSelectedTechnique.typeTechnique.length) && y > ((this.canvasEl.height / 2) - this.room.length / 2) + 1) {
                this.listTechnique.forEach(t => { if (t.typeTechnique.isSelected) { t.typeTechnique.point.x = x; t.typeTechnique.point.y = y; } })
                //this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
                //this.ctx.fillStyle = 'black';
                //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
                //this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
                this.scaling(0);
                this.disabledSave = false;
                console.log(x);
                console.log(y);
            }
        }
    }
    updateColor() {
        this.listTechnique.forEach(t => { if (t.typeTechnique.isSelected) { t.typeTechnique.color = this.color; } })
        //this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        //this.ctx.fillStyle = 'black';
        //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
        //this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
        this.scaling(0);
        this.disabledSave = false;
    }
    canvasClick(e: any) {
        var clickX = e.pageX - this.canvas.nativeElement.offsetLeft;
        var clickY = e.pageY - this.canvas.nativeElement.offsetTop;
        //if (this.scale == 1) {
        //    for (var i = this.listTechnique.length - 1; i >= 0; i--) {
        //        var technique = this.listTechnique[i];
        //        //console.log(technique.typeTechnique.point.x);
        //        //console.log(technique.typeTechnique.point.y);
        //        //console.log((technique.typeTechnique.point.x + technique.typeTechnique.length));
        //        //console.log((technique.typeTechnique.point.y + technique.typeTechnique.width));
        //        if (clickX >= technique.typeTechnique.point.x && clickY >= technique.typeTechnique.point.y && clickX <= (technique.typeTechnique.point.x + technique.typeTechnique.length) && clickY <= (technique.typeTechnique.point.y + technique.typeTechnique.width)) {
        //            this.listTechnique.forEach(t => { t.typeTechnique.isSelected = false });
        //            this.listTechnique[i].typeTechnique.isSelected = true;
        //            this.previousSelectedTechnique = this.listTechnique[i];
        //            this.isDragging = true;
        //            return;

        //        }
        //    }
        //} else {
        for (var i = this.listTechnique.length - 1; i >= 0; i--) {
            var technique = this.listTechnique[i];
            if ((clickX - (-(this.scale - 1) * this.canvasEl.width / 2)) >= (technique.typeTechnique.point.x * this.scale) && (clickY - (-(this.scale - 1) * this.canvasEl.height / 2)) >= (technique.typeTechnique.point.y * this.scale) && (clickX - (-(this.scale - 1) * this.canvasEl.width / 2)) <= ((technique.typeTechnique.point.x + technique.typeTechnique.length) * this.scale) && (clickY - (-(this.scale - 1) * this.canvasEl.height / 2)) <= ((technique.typeTechnique.point.y + technique.typeTechnique.width) * this.scale)) {
                this.listTechnique.forEach(t => { t.typeTechnique.isSelected = false });
                this.listTechnique[i].typeTechnique.isSelected = true;
                this.previousSelectedTechnique = this.listTechnique[i];
                this.isDragging = true;
                this.technique = this.listTechnique[i].technique;
                this.typeTechnique = this.listTechnique[i].typeTechnique;
                //console.log("true");
                return;
            }
            //}
        }
    }
    loadTechnique() {
        this.techniqueService.getTechniques()
            .subscribe((data: Technique[]) => this.techniqueOnDb = data);
        this.locationService.getLocations().subscribe((data: Room[]) => this.list = data);
    }
    visibleButtonCreate() {
        if (this.techniques.length == 0 && this.room.name == undefined) { return true; }
        return false;
    }
    leftRight(l: number) {
        if (this.previousSelectedTechnique != null) {
            this.location = this.previousSelectedTechnique.typeTechnique.point;
            if (this.location.x + l < (((this.canvasEl.width / 2) + (this.room.width / 2)) - this.previousSelectedTechnique.typeTechnique.width) && this.location.x + l > (((this.canvasEl.width / 2) - this.room.width / 2) + 3)) {
                this.location.x = this.location.x + l;
                this.listTechnique.forEach(t => { if (t.typeTechnique.isSelected) { t.typeTechnique.point.x = this.location.x; t.typeTechnique.point.y = this.location.y; } })
                //this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
                //this.ctx.fillStyle = 'black';
                //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
                //this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
                this.scaling(0);
                this.disabledSave = false;
            }
        }
        //else {
        //    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        //    if (this.location.x + l < ((((this.canvasEl.width / 2) - this.room.width / 2) + this.room.width) - this.listTechnique[this.listTechnique.length - 1].typeTechnique.width) && this.location.x + l > (((this.canvasEl.width / 2) - this.room.width / 2) + 3)) {
        //        this.location.x = this.location.x + l;
        //    }

        //    //this.ctx.fillStyle = 'black';
        //    //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
        //    this.listTechnique[this.listTechnique.length - 1].typeTechnique.point = this.location;
        //    //console.log(this.typeTechniques);
        //    //this.typeTechniques.forEach(t => { this.ctx.fillStyle = t.color; this.ctx.fillRect(t.point.x, t.point.y, t.width, t.length) });
        //    this.scaling(0);
        //    this.disabledSave = false;
        //}
    }
    DownUp(l: number) {
        if (this.previousSelectedTechnique != null) {
            this.location = this.previousSelectedTechnique.typeTechnique.point;
            if (this.location.y + l < ((this.canvasEl.height / 2) + (this.room.length / 2) - this.previousSelectedTechnique.typeTechnique.length) && this.location.y + l > (((this.canvasEl.height / 2) - this.room.length / 2) + 3)) {
                this.location.y = this.location.y + l;
                this.listTechnique.forEach(t => { if (t.typeTechnique.isSelected) { t.typeTechnique.point.x = this.location.x; t.typeTechnique.point.y = this.location.y; } })
                //this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
                //this.ctx.fillStyle = 'black';
                //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
                //this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
                this.scaling(0);
                this.disabledSave = false;
            }
        }
        //else {
        //    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        //    if (this.location.y + l < ((((this.canvasEl.height / 2) - this.room.length / 2) + this.room.length) - this.listTechnique[this.listTechnique.length - 1].typeTechnique.length) && this.location.y + l > (((this.canvasEl.height / 2) - this.room.length / 2) + 3)) {
        //        this.location.y = this.location.y + l;
        //    }
        //    //this.ctx.fillStyle = 'black';
        //    //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
        //    this.listTechnique[this.listTechnique.length - 1].typeTechnique.point = this.location;
        //    //this.typeTechniques.forEach(t => { this.ctx.fillStyle = t.color; this.ctx.fillRect(t.point.x, t.point.y, t.width, t.length) });
        //    this.scaling(0);
        //    this.disabledSave = false;
        //}
    }
    animate(roomForShow?: Room) {
        if (roomForShow) {
            this.clear();
            this.room = roomForShow;
            this.UpdateForm();
            this.myForm.patchValue({ Name: this.room.name, Length: this.room.length, Width: this.room.width });
            this.typeTechniques = [];
            this.listTechnique = [];
            var number = 0;
            while (this.canvasEl.width > (this.room.width * (1 + number)) && this.canvasEl.height > (this.room.length * (1 + number))) { number += 0.05; }
            //this.ctx.fillStyle = 'black';
            //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
            // this.scaling(number);
            if (this.room.technique.length != 0) {
                this.room.technique.forEach(t => { this.listTechnique.push({ technique: t.technique, typeTechnique: t.typeTechnique }); this.typeTechniques.push(t.typeTechnique); });
                // this.location = this.room.technique[this.room.technique.length - 1].typeTechnique.point;
                this.room.technique.forEach(t => this.techniques.push(t.technique));
            }
            this.scaling(number - 0.05);
            this.disabledAddLocation = false;
            this.dilableInput = true;
            this.disabledSave = true;
            console.log(this.list);
            console.log(this.listTechnique);
        }
        else {
            this.removingSameTechniqueRoom();
            this.previousSelectedTechnique = null;
            if (this.hasTechnique(this.technique)) {
                if (confirm("Даннная техника имеет другую локацию, изменить?")) {
                    this.deleteTechnique(this.technique);
                    //this.ctx.fillStyle = 'black';
                    //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
                    this.typeTechnique.id = this.technique.id;
                    this.typeTechnique.point = new locationPoint((this.canvasEl.width / 2) - this.typeTechnique.width / 2, (this.canvasEl.height / 2) - this.typeTechnique.length / 2);
                    this.typeTechnique.color = this.returnColortechnique(this.technique);
                    this.typeTechniques.push(this.typeTechnique);
                    this.techniques.push(this.technique);
                    this.listTechnique.push({ technique: this.technique, typeTechnique: this.typeTechnique });
                    //this.location = this.listTechnique[this.listTechnique.length - 1].typeTechnique.point;
                    //this.ctx.fillStyle  = this.typeTechnique.color;
                    //this.ctx.fillRect(this.location.x, this.location.y, this.typeTechnique.width, this.typeTechnique.length);
                    this.scaling(0);
                    this.typeTechnique = new TypeTechnique();
                    this.technique = new Technique();
                    this.UpdateForm();
                    this.myForm.patchValue({ Name: this.room.name, Length: this.room.length, Width: this.room.width });
                    this.disabledSave = false;
                    this.disabledAddLocation = false;
                    this.disabledSave = false;
                }
            } else {
                //this.ctx.fillStyle = 'black';
                //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
                this.typeTechnique.id = this.technique.id;
                this.typeTechnique.point = new locationPoint((this.canvasEl.width / 2) - this.typeTechnique.width / 2, (this.canvasEl.height / 2) - this.typeTechnique.length / 2);
                this.typeTechnique.color = this.color;
                this.typeTechniques.push(this.typeTechnique);
                this.techniques.push(this.technique);
                this.listTechnique.push({ technique: this.technique, typeTechnique: this.typeTechnique });
                // this.location = this.listTechnique[this.listTechnique.length - 1].typeTechnique.point;
                //this.ctx.fillStyle = this.typeTechnique.color;
                //this.ctx.fillRect(this.location.x, this.location.y, this.typeTechnique.width, this.typeTechnique.length);
                this.scaling(0);
                this.typeTechnique = new TypeTechnique();
                this.technique = new Technique();
                this.UpdateForm();
                this.myForm.patchValue({ Name: this.room.name, Length: this.room.length, Width: this.room.width });
                this.disabledAddLocation = false;
                this.disabledSave = false;
            }

        }
    }
    createRoom() {
        this.ctx.fillStyle = 'black';
        this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
        this.UpdateForm();
        this.myForm.patchValue({ Name: this.room.name, Length: this.room.length, Width: this.room.width });
        this.disabledSave = false;
        this.disabledAddLocation = false;

    }
    hasTechnique(techniqueForSearch: Technique) {
        for (var techInRoom of this.list) {
            for (var t of techInRoom.technique) {
                if (t.technique == techniqueForSearch) { return true; }
            }
        }
        return false;
    }
    removingSameTechniqueRoom() {
        var index = null;
        this.listTechnique.forEach(t => { if (t.technique === this.technique) { index = this.listTechnique.indexOf(t); this.techniques.splice(this.techniques.indexOf(t.technique), 1); this.typeTechniques.splice(this.typeTechniques.indexOf(t.typeTechnique), 1); } });
        if (index != null) {
            this.listTechnique.splice(index, 1);
            //this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            //this.ctx.fillStyle = 'black';
            //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
            //this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
            if (this.previousSelectedTechnique.technique === this.technique) {
                this.previousSelectedTechnique = null;
            }
        }
    }
    scaling(delta: number) {
        //this.ctx.globalAlpha = 0.5; gпрозрачность
        this.scale += delta;
        if (this.selectTechnique != undefined && this.selectTechnique != "") { this.select(this.previousSelectedTechnique); } else {
            // this.scale += delta;
            this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.ctx.save();
            this.ctx.transform(this.scale, 0, 0, this.scale, (-(this.scale - 1) * this.canvasEl.width / 2), -(this.scale - 1) * this.canvasEl.height / 2);
            this.ctx.beginPath();
            this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
            this.listTechnique.forEach(t => { this.ctx.globalAlpha *= t.typeTechnique.layer; this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
            this.ctx.closePath();
            this.ctx.restore();
            //this.ctx.globalAlpha = 1;
        }
    }
    select(tt?: techniqueAndType) {
        if (this.selectTechnique != undefined && this.selectTechnique != "") {
            this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.ctx.save();
            this.ctx.transform(this.scale, 0, 0, this.scale, (-(this.scale - 1) * this.canvasEl.width / 2), -(this.scale - 1) * this.canvasEl.height / 2);
            this.ctx.beginPath();
            this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
            this.listTechnique.forEach(t => { if (t.technique.name == this.selectTechnique.technique.name) { { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) } } });
            this.ctx.closePath();
            this.ctx.restore();
            this.disabledAddLocation = true;
            if (!tt) { this.previousSelectedTechnique = null; }
            else { this.previousSelectedTechnique = tt; }
        } else {
            this.scaling(0);
            this.disabledAddLocation = false;
        }
    }
    unique() {
        this.nameLayer = [];
        var k = 0
        if (this.listTechnique.length != 0) {
            this.nameLayer.push(this.listTechnique[0]);
            for (var i of this.listTechnique) {
                for (var j of this.nameLayer) {
                    if (i.technique.name.toUpperCase() === j.technique.name.toUpperCase()) { k++; }
                }

                if (k == 0) this.nameLayer.push(i);
                k = 0;
            }
        }
        console.log(this.nameLayer);
        // return this.nameLayer;
    }
    returnColortechnique(technique: Technique) {
        for (var techInRoom of this.list) {
            for (var t of techInRoom.technique) {
                if (t.technique == technique) {
                    return t.typeTechnique.color;
                }
            }
        }
    }
    deleteTechniqueInRoom() {
        var index = 0;
        this.listTechnique.forEach(t => { if (t == this.previousSelectedTechnique) { index = this.listTechnique.indexOf(t); this.techniques.splice(this.techniques.indexOf(t.technique), 1); this.typeTechniques.splice(this.typeTechniques.indexOf(t.typeTechnique), 1); } });
        this.listTechnique.splice(index, 1);
        if (this.listTechnique.length != 0)
            this.location = this.listTechnique[this.listTechnique.length - 1].typeTechnique.point;
        this.previousSelectedTechnique = null;
        //this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        //this.ctx.fillStyle = 'black';
        //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
        //this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
        this.scaling(0);
    }
    deleteTechnique(techniqueForDelete?: Technique) {
        if (techniqueForDelete) {
            this.techniquesForDelete.push(techniqueForDelete);
        }
        else {
            for (var deleteTechnique of this.techniquesForDelete) {
                for (var techInRoom of this.list) {
                    for (var t of techInRoom.technique) {
                        if (t.technique == deleteTechnique) {
                            var index = techInRoom.technique.indexOf(t);
                            if (index > -1) {
                                techInRoom.technique.splice(index, 1);
                                //this.locationService.SaveLocation(techInRoom).subscribe(data => this.loadTechnique());
                            }
                        }
                    }
                }
            }
        }
    }
    deleteRoom(room: Room) {
        for (var r of this.list) {
            if (r == room) {
                var index = this.list.indexOf(r);
                if (index > -1) {
                    this.list.splice(index, 1);
                    this.locationService.deleteRoom(r).subscribe(data => this.loadTechnique());
                    //this.clear();
                }
            }
        }

    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        this.typeTechnique = new TypeTechnique();
        this.room = new Room();
        this.technique = new Technique();
        this.typeTechniques = [];
        this.techniques = [];
        this.techniquesForDelete = [];
        this.listTechnique = [];
        this.disabledSave = true;
        this.disabledAddLocation = true;
        this.dilableInput = false;
        this.UpdateForm();
        this.previousSelectedTechnique = null;
        this.scale = 1;
        this.selectTechnique = undefined;
        console.log(this.list);
        console.log(this.listTechnique);
    }

    @HostListener('document:keydown.W') w(event: KeyboardEvent) {
        console.log(this.listTechnique);
        if (this.listTechnique.length != 0) {
            this.DownUp(-4);
        }
    }
    @HostListener('document:keydown.S') s(event: KeyboardEvent) {
        if (this.listTechnique.length != 0) {
            this.DownUp(4);
        }
    }
    @HostListener('document:keydown.A') a(event: KeyboardEvent) {
        if (this.listTechnique.length != 0) {
            this.leftRight(-4);
        }
    }
    @HostListener('document:keydown.D') d(event: KeyboardEvent) {
        if (this.listTechnique.length != 0) {
            this.leftRight(4);
        }

    }
    @HostListener('document:onscroll') scroll(event: KeyboardEvent) {
        if (this.listTechnique.length != 0) {
            this.leftRight(4);
        }

    }
    scale: number = 1;
    @HostListener('mousewheel', ['$event'])
    onScroll5(e: any) {
        console.log('mousewheel')
        var delta = e.deltaY || e.detail || e.wheelDelta;
        if (delta > 0) this.scaling(0.05);
        else this.scaling(-0.05);

        ////this.canvasEl.style.transform = 'scale(' + this.scale + ')';
        //if (this.canvasEl.width > (this.room.width * this.scale) && this.canvasEl.height > (this.room.length * this.scale) && (this.room.width * this.scale) > 100 && (this.room.length * this.scale) > 100) {
        //    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        //    this.ctx.fillStyle = 'black';
        //    //((t.typeTechnique.point.x)) - ((t.typeTechnique.point.x)) - (((this.canvasEl.width / 2) - (this.room.width * this.scale) / 2));
        //    this.ctx.strokeRect((this.canvasEl.width / 2) - (this.room.width * this.scale) / 2, (this.canvasEl.height / 2) - (this.room.length * this.scale) / 2, this.room.width * this.scale, this.room.length * this.scale);
        //    this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; if (delta > 0) { this.ctx.fillRect(t.typeTechnique.point.x - (((this.room.width * this.scale) - this.room.width) / 2), t.typeTechnique.point.y - (((this.room.length * this.scale) - this.room.length) / 2), t.typeTechnique.width * this.scale, t.typeTechnique.length * this.scale); } else { this.ctx.fillRect(t.typeTechnique.point.x - (((this.room.width * this.scale) - this.room.width) / 2), t.typeTechnique.point.y - (((this.room.length * this.scale) - this.room.length) / 2), t.typeTechnique.width * this.scale, t.typeTechnique.length * this.scale); } });
        //} // отменим прокрутку
        //this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        //this.ctx.save();
        //this.ctx.translate(0,0);
        //this.ctx.scale(this.scale, this.scale);
        //this.ctx.beginPath(); // begin custom shape
        //this.ctx.fillStyle = 'black';
        //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
        //this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
        //this.ctx.closePath(); // complete custom shape
        //this.ctx.stroke();
        //this.ctx.restore();
        //lat
        //this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        //this.ctx.save();
        //// this.ctx.translate((this.canvasEl.width / 2) - (this.room.width * this.scale) / 2, (this.canvasEl.height / 2) - (this.room.length * this.scale) / 2);
        //this.ctx.scale(this.scale, this.scale); console.log(this.scale);
        ////this.ctx.translate(-((this.canvasEl.width / 2) - (this.room.width * this.scale) / 2), -((this.canvasEl.height / 2) - (this.room.length * this.scale) / 2));
        //this.ctx.beginPath();
        //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
        //this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
        //this.ctx.closePath();
        ////this.
        //end
        //this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        //this.ctx.save();
        //this.ctx.transform(this.scale, 0, 0, this.scale, (-(this.scale - 1) * this.canvasEl.width / 2), -(this.scale - 1) * this.canvasEl.height / 2);
        //this.ctx.beginPath();
        //this.ctx.strokeRect((this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.room.width, this.room.length);
        //this.listTechnique.forEach(t => { this.ctx.fillStyle = t.typeTechnique.color; this.ctx.fillRect(t.typeTechnique.point.x, t.typeTechnique.point.y, t.typeTechnique.width, t.typeTechnique.length) });
        //this.ctx.closePath();
        ////set whatever you want as zoom factor
        ////this.ctx.setTransform
        ////    (zoomfactor, 0, 0, zoomfactor, (-(zoomfactor - 1) * this.canvasEl.width / 2), -(zoomfactor - 1) * this.canvasEl.height / 2);
        //this.ctx.restore();
        // this.ctx = this.ctx.drawImage(this.canvasEl, (this.canvasEl.width / 2) - this.room.width / 2, (this.canvasEl.height / 2) - this.room.length / 2, this.canvasEl.width * this.scale, this.canvasEl.height * this.scale);
        // this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
        e.preventDefault();

    }
    save() {
        if (this.list.indexOf(this.room) != -1) {
            this.deleteTechnique();
            var index = this.list.indexOf(this.room);
            if (index > -1) {
                this.list.splice(index, 1);
            }
            this.room.technique = this.listTechnique;
            this.list.push(this.room);

        }
        else {
            this.deleteTechnique();
            this.room.technique = this.listTechnique;
            this.list.push(this.room);
        }
        this.locationService.SaveLocation(this.room).subscribe(data => this.loadTechnique());
        this.clear();
    }
}
