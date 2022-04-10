import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';
import cors from 'cors';
import pgPromise from 'pg-promise';
import { v4 as uuidv4 } from 'uuid';
import schema from './schema.js'
// add your Postgresql connection string details
const username='postgres';
const pwd='pass09876';
const db='TestSales';
const connStr =
'postgres://'+username+':'+pwd+'@localhost:5432/'+db;
const pgp = pgPromise({}); // empty pgPromise instance
const psql = pgp(connStr); // get connection to your PG db instance

// GraphQL schema to define the operations with types of data elements involved
/*
const schema = buildSchema(`
type Query {
    allSales:[Sales],
    dailySales(SDate: String):[SalesStatus],
    monthlySales(SYear: String,SMonth: String):[MonthlyStatus],
    weeklySales(SDate: String):[WeeklySales],
    overallmonthlySales:[overallMonthlyStatus]
},
type Mutation{
    SalesEntry(CustomerName: String,Amount: Float,TDate: String):Sales
},
type Sales{
    id: ID
    CustomerName: String
    Amount: Float
    TDate: String
},
type SalesStatus{
    tdate: String
    hour: String
    hoursum: Float
},
type overallMonthlyStatus{
    tyear: String
    tmonth: String
    monthlysum: Float
},
type MonthlyStatus{
    tyear: String
    tmonth: String
    tday: String
    daysum: Float
},
type WeeklySales{
    tyear: String
    tmonth: String
    tweek: String
    tday: String
    daysum: Float
}
`);*/
// Resolver logic to respond to the query
const root = {
    allSales : async (parent, args, ctx) => {
        const sQuery = "select \"id\" as ID,\"CustomerName\",\"Amount\",TO_CHAR(\"TDate\",\'yyyy-mm-dd\') as \"TDate\" from sales";
        return psql.manyOrNone(sQuery);//using pgsql connection to get data
        },
    dailySales: async ({SDate})=>{
        const sQuery = "select TO_CHAR(\"TDate\",'yyyy-mm-dd') as tdate,extract(HOUR from \"TDate\")as hour, sum(\"Amount\") as hoursum from sales where TO_CHAR(\"TDate\",'yyyy-mm-dd')='"+SDate+"' group by 1,2";
        return psql.manyOrNone(sQuery);//using pgsql connection to get data
    },
    weeklySales: async ({SDate})=>{
        const sQuery = "select extract(YEAR from \"TDate\")as tyear, TO_CHAR(\"TDate\",'Month')as tmonth,extract(DAY from \"TDate\")as tday,extract(WEEK from \"TDate\")as tweek,sum(\"Amount\") as daysum from sales where extract(WEEK from \"TDate\")=extract(WEEK from TIMESTAMP '"+SDate+"') group by 1,2,3,4";
        return psql.manyOrNone(sQuery);//using pgsql connection to get data
    },
    monthlySales: async ({SYear,SMonth})=>{
        const sQuery = "select extract(YEAR from \"TDate\")as tyear, TO_CHAR(\"TDate\",'Month')as tmonth,extract(DAY from \"TDate\")as tday,sum(\"Amount\") as daysum from sales where extract(YEAR from \"TDate\")="+SYear+" and extract(MONTH from \"TDate\")="+SMonth+" group by 1,2,3";
        return psql.manyOrNone(sQuery);//using pgsql connection to get data
    },
    overallmonthlySales: async (parent, args, ctx)=>{
        const sQuery = "select extract(YEAR from \"TDate\")as tyear, TO_CHAR(\"TDate\",'Month')as tmonth,sum(\"Amount\") as monthlysum from sales group by 1,2";
        return psql.manyOrNone(sQuery);//using pgsql connection to get data
    },
    SalesEntry: async({CustomerName,Amount,TDate})=>{
        var id=uuidv4();        
        return psql.one("INSERT INTO sales VALUES ($1, $2, $3, $4) RETURNING *", [id, CustomerName, Amount, TDate]);      
    }
    
};
const app = express().use('*', cors());//cors included to enable CORS requests
app.use('/graphql', graphqlHTTP({
schema: schema,
rootValue: root,
graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running at localhost:4000/graphql'));