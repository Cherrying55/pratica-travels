import connection from "../database/database.js";

export async function getTravels(req,res){

    const page = Number(req.query.page);
    if(!page || page <= 0){
        return res.send("Invalid page value.").status(400);
    }
    const name = req.query.name;
    console.log(page);
    console.log(name);

    try {
        let queryParams = [];
        const query = `select p."fullName", COUNT(p) as "viagens"  from passengers as p
        JOIN passenger_travels ON passenger_travels."passengerId" = p.id
        JOIN travels ON travels.id = passenger_travels."travelId"
        WHERE p."fullName" ILIKE $1
              GROUP BY p."fullName" 
              ORDER BY "viagens" desc`;
              queryParams.push(`%${name}%`); // ILIKE
    
        /*if (name) {
            query += `
              WHERE p."fullName" ILIKE $1
              GROUP BY p."fullName" 
              ORDER BY "viagens" desc
            `;
            queryParams.push(`%${name}%`); // ILIKE
          }
        
        else{
            query +=`
            GROUP BY p."fullName" 
              ORDER BY "viagens" desc
            `
        } */
    
        let result = connection.query(query, queryParams);
        console.log(result.rows);
        if(result.rows.length > 100){
            return res.send("Too many results.").status(500);
        }
        else{return res.send(result.rows.slice(page*25));}
    
        

    } catch (error) {
        return res.sendStatus(500);
    }

   
}