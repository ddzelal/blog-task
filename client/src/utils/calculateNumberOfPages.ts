export const calculateNumberOfPages = (itemsPerPage: number, totalCount: number) => {
    return Math.ceil(totalCount / itemsPerPage);
};
