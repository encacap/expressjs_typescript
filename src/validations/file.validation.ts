import { object, string } from "yup";

const getUploadImageSignature = {
    query: object().shape({
        post_type: string().oneOf(["estate", "news"]).required(),
    }),
};

export default { getUploadImageSignature };
