import { buildSchema } from "graphql";

const schema = buildSchema(`
type Query {
    allSales:[Sales],
    dailySales(SDate: String):[SalesStatus],
    monthlySales(SYear: String,SMonth: String):[MonthlyStatus],
    weeklySales(SDate: String):[WeeklySales]
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
    monthlysum: Float
},
type WeeklySales{
    tyear: String
    tmonth: String
    tweek: String
    tday: String
    daysum: Float
}
`)
export default schema;