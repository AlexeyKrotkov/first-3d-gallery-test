export const getValueByLimit = ({ value, min, max }) => {
    if (value < min) return min;
    return value > max ? max : value;
};
