using App.BLL.Models;
using System.Collections.Generic;

namespace App.BLL.Interfaces
{
    public interface ITechniqueService
    {
        void SaveTechnique(TechniqueDTO techniqueDto);
        void DeleteTechnique(TechniqueDTO techniqueDto);
        TechniqueDTO GetTechnique(int? id);
        IEnumerable<TechniqueDTO> GetTechniqueList();

    }
}
