export interface Column<T> {
  header: string;
  accessor: keyof T; // Ensure accessor is a key of the data type
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

// Update TableProps accordingly
export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
}
