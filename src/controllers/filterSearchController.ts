import { Response, Request } from "express";
import filterSearchService from "../services/filterSearchService";

const filterSearchController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id_type, type } = req.body;

    const breweries = await filterSearchService.searchBeersByType(
      id_type,
      type
    );

    res.status(200).json(breweries);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est apparue lors de la récupération des bières.",
    });
  }
};
export default { filterSearchController };
