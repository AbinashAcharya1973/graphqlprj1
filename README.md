# GraphqlPrj1 [NodeJs-GraphQl-PostgreSql]

| Database Name       | Table Name      |
| ------------- |:-------------:|
| TestSales      | sales |

<h4>Structure of the sales table:</h4><br>

| Column Name       | Data Type           | Size  |
| ------------- |:-------------:| -----:|
| id      | uuid |  |
| CustomerName      | character varying      |   255 |
| Amount | double      |     |
| TDate | timestamp with timezone      |     |

<h4>Data Entry</h4><br>
SalesEntry(CustomerName: String,Amount: Float,TDate: String):Sales
<pre>
mutation{
  SalesEntry(CustomerName:"Asin",Amount:200,TDate:"2022-04-10"){
   CustomerName
  	id
  }
}
</pre>
<h4>List of Sales</h4><br>
SalesEntry(CustomerName: String,Amount: Float,TDate: String):Sales
<pre>
{
  allSales{
    id
    CustomerName
    Amount
    TDate
  }
}
</pre>