import React from "react";
// import { Column } from "./types/TableTypes";

// components
import OrdersOverview from "./pages/OrdersOverview";
// import GenericTable from "./components/Table";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

const App: React.FC = () => {
  // const data: Product[] = [
  //   { id: 1, name: "Product A", price: 50 },
  //   { id: 2, name: "Product B", price: 100 },
  //   { id: 3, name: "Product C", price: 150 },
  // ];

  // const columns: Column<Product>[] = [
  //   { header: "ID", accessor: "id" },
  //   { header: "Name", accessor: "name" },
  //   {
  //     header: "Price",
  //     accessor: "price",
  //     render: (value) => <span>${value}</span>,
  //   },
  // ];

  // const actions = (row: Product) => (
  //   <button className="text-blue-500 hover:underline">Edit {row.name}</button>
  // );

  return (
    <>
      <OrdersOverview />
    </>
  );
};

export default App;
