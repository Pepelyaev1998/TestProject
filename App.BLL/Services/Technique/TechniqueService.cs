using App.BLL.Interfaces;
using App.BLL.Models;
using System.Collections.Generic;
using AutoMapper;
using App.DAL.Repositories;
using System.Linq;
using TechniqueAlias = App.DAL.Models;

namespace App.BLL.Services.Technique
{

    public class TechniqueService : ITechniqueService
    {
        IEntityRepository EntityRepository { get; set; }

        public TechniqueService(IEntityRepository entityRepository)
        {
            EntityRepository = entityRepository;
        }
        public void DeleteTechnique(TechniqueDTO techniqueDto)
        {
            var technique = Mapper.Map<TechniqueDTO, TechniqueAlias.Technique>(techniqueDto);
            EntityRepository.DeleteEntity(technique);
            EntityRepository.Save();
        }
        public void SaveTechnique(TechniqueDTO techniqueDto)
        {
            var technique = Mapper.Map<TechniqueDTO, TechniqueAlias.Technique>(techniqueDto);
            EntityRepository.SaveEntity(technique);
            EntityRepository.Save();
        }
        public TechniqueDTO GetTechnique(int? id)
        {
            if (id == null)
                return null;
            var techniqueD = EntityRepository.Techniques.FirstOrDefault(p => p.Id == id);
            var technique = Mapper.Map<TechniqueAlias.Technique, TechniqueDTO>(techniqueD);
            if (technique == null)
                return null;
            return technique;

        }
        public IEnumerable<TechniqueDTO> GetTechniqueList()
        {
            return Mapper.Map<IEnumerable<TechniqueAlias.Technique>, List<TechniqueDTO>>(EntityRepository.Techniques);
        }

        //public void Dispose()
        //{
        //    EntityRepository.Dispose();SqlException: Invalid object name 'Technique'.

        //}

    }
}
