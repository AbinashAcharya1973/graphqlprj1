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
allSales:[Sales]
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
<h4>Daily of Sales</h4><br>
dailySales(SDate: String):[SalesStatus]
<pre>
{
  dailySales(SDate:"2022-04-10"){
    tdate
    hour
    hoursum
  }
}
</pre>
<h4>Weekly of Sales</h4><br>
weeklySales(SDate: String):[WeeklySales]
<pre>
{
  weeklySales(SDate:"2022-04-10"){
    tyear
    tmonth
    tday
    tweek
    daysum
  }
}
</pre>
<h4>Monthly of Sales</h4><br>
monthlySales(SYear: String,SMonth: String):[MonthlyStatus]
<pre>
{
  monthlySales(SYear:"2022",SMonth:"4"){
    tyear
    tmonth
    tday
    daysum
  }
}
</pre>
<<<<<<< HEAD
=======

>>>>>>> 420cee29272ffef1235d33892a41a14373c42ba3
