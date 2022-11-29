import reporte from "../modelo/report.js"

export const getReport= async (req, res) => {
    res.render('reporte/reporte');
}

export const ApigetReport = async (req, res) => {
    const reportes= new reporte();
    try {
        const [rows] = await reportes.ObtenerDatosReporte(); //trae una arreglo de objetos
        res.json(rows);
    } catch (error) {
        res.send(error);
    }
}

export const ApigetReportDatos = async (req, res) => {
    const { search } = req.body;
    const reportes = new reporte();
    reportes.Codigo = search;
    try {
        const [rows] = await reportes.ObtenerBusquedad();//trae una arreglo de objetos
        res.send(rows);
    } catch (error) {
        res.send(error);
    }
}
