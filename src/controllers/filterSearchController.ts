import { Response, Request } from "express";
import filterSearchService from "../services/filterSearchService";

const filterSearchController = async (req: Request, res: Response) => {
  try {
    const { id_types, type } = req.body;

    const breweries = await filterSearchService.searchBeersByType(
      id_types,
      type
    );
    if (Array.isArray(breweries) && breweries.length === 0) {
      res.json({ message: "Aucune bière n'a été troouvée !" });
      return;
    }

    res.status(200).json(breweries);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est apparue lors de la récupération des bières.",
    });
  }
};
export default { filterSearchController };
