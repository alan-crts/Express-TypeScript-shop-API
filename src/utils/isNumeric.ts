export default (value: any) => {
    if (typeof value !== 'number') {
        throw new Error('Price must be a number');
    }

    return true;
}