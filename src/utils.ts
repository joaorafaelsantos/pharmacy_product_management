const ascSortById = (data: Array<Object>, objProp: string = "id") => {
    return [...data].sort(function (a, b) {
        return a[objProp] - b[objProp];
    })
}

export default ascSortById