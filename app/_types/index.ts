export type Pyramid = number[][];
export type Position = {
    row: number,
    col: number
}
export type Cell = {
    position: Position,
    cell: number
}
export type Path = Cell[];