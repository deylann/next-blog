import * as Yup from "yup";

const BlogSchema = Yup.object().shape({
    userId: Yup.number().required().positive().integer(),
    body: Yup.string()
      .required("Body is required"),
    title: Yup.string()
      .required("Title is required")
  });

export default BlogSchema;