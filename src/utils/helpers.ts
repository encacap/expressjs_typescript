const slugify = (inputString: string) => {
    let outputString = inputString.toLowerCase();
    outputString = outputString.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    outputString = outputString.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    outputString = outputString.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    outputString = outputString.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    outputString = outputString.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    outputString = outputString.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    outputString = outputString.replace(/(đ)/g, "d");
    outputString = outputString.replace(/([^0-9a-z-\s])/g, "");
    outputString = outputString.replace(/(\s+)/g, "-");
    outputString = outputString.replace(/^-+/g, "");
    outputString = outputString.replace(/-+$/g, "");
    return outputString;
};

export { slugify };
