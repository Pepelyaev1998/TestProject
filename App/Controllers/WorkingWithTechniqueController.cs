using System.Collections.Generic;
using App.BLL.Models;
using App.Common;
using Microsoft.AspNetCore.Mvc;
using App.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using App.BLL.Interfaces;
using System.IO;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;
using System.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace App.Controllers
{
    [Route("api/products")]
    public class WorkingWithTechniqueController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        ITechniqueService techniqueService;
        public WorkingWithTechniqueController(ITechniqueService techniqueService, IHostingEnvironment hostingEnvironment)
        {
            this.techniqueService = techniqueService;
            _hostingEnvironment = hostingEnvironment;
        }
        //[Authorize]
        //[HttpGet]
        //[ActionName("Delete")]
        //public IActionResult ConfirmDelete(int? id)
        //{
        //    if (id != null)
        //    {
        //        var technique = techniqueService.GetTechnique(id);
        //        if (technique != null)
        //        {
        //            var t = Mapper.Map<TechniqueDTO, Technique>(technique);
        //            return View(t);
        //        }
        //        return Content("The technique is not found!");
        //    }
        //    return Content("id is not set!");
        //}
        [Route("Export")]
        [HttpGet]
        public async Task<IActionResult> Export()
        {
            var tech = Mapper.Map<IEnumerable<TechniqueDTO>, List<Technique>>(techniqueService.GetTechniqueList());
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = @"technique.xlsx";
            var memory = new MemoryStream();
            using (var fs = new FileStream(Path.Combine(sWebRootFolder, sFileName), FileMode.Create, FileAccess.Write))
            {
                IWorkbook workbook;
                workbook = new XSSFWorkbook();
                ISheet excelSheet = workbook.CreateSheet("Technique");
                excelSheet.DefaultColumnWidth = 30;
                IRow row = excelSheet.CreateRow(0);
                row.CreateCell(0).SetCellValue("Наименование");
                row.CreateCell(1).SetCellValue("Модель");
                row.CreateCell(2).SetCellValue("Номер");
                row.CreateCell(3).SetCellValue("Количество");
                row.CreateCell(4).SetCellValue("Статус");
                row.CreateCell(5).SetCellValue("Примечание");

                for (int r = 1; r <= tech.Count; r++)
                {
                    row = excelSheet.CreateRow(r);
                    var item = tech[r - 1];
                    row.CreateCell(0).SetCellValue(item.Name);
                    row.CreateCell(1).SetCellValue(item.Model);
                    row.CreateCell(2).SetCellValue(item.Number);
                    row.GetCell(2).CellStyle.Alignment = HorizontalAlignment.Left;
                    row.CreateCell(3).SetCellValue(item.Amount);
                    if (item.Status == StatusModel.DontUsed) { row.CreateCell(4).SetCellValue("Не используется"); }
                    else { row.CreateCell(4).SetCellValue("Используется"); }
                    row.CreateCell(5).SetCellValue(item.Notation);
                }
                workbook.Write(fs);
            }
            using (var stream = new FileStream(Path.Combine(sWebRootFolder, sFileName), FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", sFileName);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int? id)
        {

            var technique = techniqueService.GetTechnique(id);
            if (technique != null)
            {
                techniqueService.DeleteTechnique(technique);
                return Ok(technique);
            }
            return BadRequest();
        }

        [Authorize]
        [HttpGet("{id}")]
        public Technique Get(int? id)
        {
            if (id != null)
            {
                var technique = techniqueService.GetTechnique(id);
                if (technique != null)
                {
                    var t = Mapper.Map<TechniqueDTO, Technique>(technique);
                    return t;
                }
                return null;
            }
            return null;
        }
        //[Authorize]
        //public IActionResult SortForName()
        //{
        //    var tech = Mapper.Map<IEnumerable<TechniqueDTO>, List<Technique>>(techniqueService.GetTechniqueList());
        //    var orderTech = from t in tech
        //                    orderby t.Name
        //                    select t;

        //    return View("GetTechniqueList", orderTech);


        //}
        //[Authorize]
        //public IActionResult SortForModel()
        //{
        //    var tech = Mapper.Map<IEnumerable<TechniqueDTO>, List<Technique>>(techniqueService.GetTechniqueList());
        //    var orderTech = from t in tech
        //                    orderby t.Model
        //                    select t;
        //    return View("GetTechniqueList", orderTech);


        //}
        //[Authorize]
        //public IActionResult SortForNumber()
        //{
        //    var tech = Mapper.Map<IEnumerable<TechniqueDTO>, List<Technique>>(techniqueService.GetTechniqueList());
        //    var orderTech = from t in tech
        //                    orderby t.Number
        //                    select t;
        //    return View("GetTechniqueList", orderTech);


        //}
        //[Authorize]
        //public IActionResult SortForAmount()
        //{
        //    var tech = Mapper.Map<IEnumerable<TechniqueDTO>, List<Technique>>(techniqueService.GetTechniqueList());
        //    var orderTech = from t in tech
        //                    orderby t.Amount
        //                    select t;
        //    return View("GetTechniqueList", orderTech);


        //}
        //[Authorize]
        //public IActionResult SortForStatus()
        //{
        //    var tech = Mapper.Map<IEnumerable<TechniqueDTO>, List<Technique>>(techniqueService.GetTechniqueList());
        //    var orderTech = from t in tech
        //                    orderby t.Status
        //                    select t;
        //    return View("GetTechniqueList", orderTech);


        //}

        //[Authorize]
        //public IActionResult Update(int? id)
        //{
        //    if (id != null)
        //    {
        //        var technique = techniqueService.GetTechnique(id);
        //        if (technique != null)
        //        {
        //            var t = Mapper.Map<TechniqueDTO, Technique>(technique);
        //            return View(t);
        //        }
        //        return Content("The technique is not found!");
        //    }
        //    return Content("id is not set!");
        //}
        //[Authorize]
        //[HttpPost]
        //public IActionResult Update(Technique technique)
        //{
        //    if (ModelState.IsValid && technique != null)
        //    {
        //        var updatedTechnique = Mapper.Map<Technique, TechniqueDTO>(technique);
        //        techniqueService.SaveTechnique(updatedTechnique);
        //        return Ok(technique);
        //    }
        //    return BadRequest(ModelState);
        //}
        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody]Technique technique)//create
        {
            if (ModelState.IsValid && technique != null)
            {
                var createdTechnique = Mapper.Map<Technique, TechniqueDTO>(technique);
                techniqueService.SaveTechnique(createdTechnique);
                return Ok(technique);
            }
            return BadRequest(ModelState);
        }
        //[Authorize]
        //[HttpPost]
        //public IActionResult Found([FromBody]string txtValue)
        //{
        //    var tech = Mapper.Map<IEnumerable<TechniqueDTO>, List<Technique>>(techniqueService.GetTechniqueList());
        //    if (!string.IsNullOrEmpty(txtValue))
        //    {
        //        var foundTech = from t in tech
        //                        where t.Name.Contains(txtValue) || t.Model.Contains(txtValue) || t.Number.ToString().Contains(txtValue) || t.Amount.ToString().Contains(txtValue) || t.Status.ToString().Contains(txtValue) || t.Notation?.Contains(txtValue) != null
        //                        select t;
        //        return View("GetTechniqueList", foundTech);
        //    }
        //    return View("GetTechniqueList",tech);
        //}
        //[Authorize]
        //[HttpGet]
        //public IActionResult Create()
        //{
        //    return View();
        //}
        [Authorize]
        [HttpGet]
        public IEnumerable<Technique> Get()
        {
            var tech = Mapper.Map<IEnumerable<TechniqueDTO>, List<Technique>>(techniqueService.GetTechniqueList());
            return tech;
        }
        //protected override void Dispose(bool disposing)
        //{
        //    techniqueService.Dispose();
        //    base.Dispose(disposing);
        //}
    }
}