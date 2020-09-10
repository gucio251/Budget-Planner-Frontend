const size = {
    mobile: 576,
    tablet: 961,
}

export const devices = Object.keys(size).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (max-width: ${size[breakpoint]}px)`;
    return acc;
}, {});