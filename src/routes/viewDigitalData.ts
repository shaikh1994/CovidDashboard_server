import express from "express";
import fs from "fs";
import csvParser from "csv-parser";

const router = express.Router();

router.get("/data", (req, res) => {
  const data = {
    id: [],
    country: [],
    region: [],
    dates: [],
    confirmed: [],
    deaths: [],
    recovered: [],
    active: [],
    lat: [],
    long: [],
    
  };

  
  // fs.createReadStream("df_kundigung_w_forecast.csv")
  // fs.createReadStream("12sep.csv")
  fs.createReadStream("covid_19_clean_complete.csv")
    .pipe(csvParser())
    .on("data", (row) => {
      data.id.push(row.id);
      data.country.push(row.Country);
      data.region.push(row.Region);
      data.confirmed.push(row.Confirmed);
      data.deaths.push(row.Deaths);
      data.recovered.push(row.Recovered);
      data.active.push(row.Active);
      data.lat.push(row.Lat);
      data.dates.push(row.Date);
      data.long.push(row.Long);
    })
    .on("end", () => {
      // console.log("data",data)
      res.json({
        totalItems: data.id.length,
        data,
      });
    })
    .on("error", (err) => {
      // Handle any errors during CSV parsing or reading
      console.error("Error reading CSV:", err);
      res.status(500).json({ error: "Failed to read CSV data" });
    });
});

export default router;
