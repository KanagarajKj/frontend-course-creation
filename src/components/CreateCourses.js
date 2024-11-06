import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from "react-toastify";
import { Upload } from 'lucide-react';
import { usePostCourseMutation, useGetCourseUserByIdQuery } from '../services/courseApi';
import PreviewModal from './Modals/PreviewModal';
import { useNavigate } from 'react-router-dom';

const CreateCourses = () => {
  const userId = localStorage.getItem("userId");
  const [createNewCourse, { isLoading, error, data, isError }] = usePostCourseMutation();
  const { refetch } = useGetCourseUserByIdQuery(userId);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      category: '',
      duration: '',
      description: '',
      faq: [{ question: '', answer: '' }],
      coverImage: 'https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=600',
      salesVideo: 'https://www.youtube.com/watch?v=zkOXQSR3ClM&t=72s',
    }
  });

  const { fields: faqFields, append, remove } = useFieldArray({
    control: control,
    name: "faq", // Array name
  });

  const formValues = watch();

  const handlePreview = () => {
    setPreviewData(formValues);
    setIsPreviewOpen(true);
  };

  const onSubmit = async (data, isDraft = false) => {
    const newData = Object.assign(data, { isDraft,userId });
    const createCourse = await createNewCourse({ data: newData });
    await refetch();
    if(error?.data?.message) {
      toast.error(error?.data?.message);
      return;
    }
    toast.success("Course created successfully!");
    reset();
    navigate("/my-courses")
  };

  return (
    <>
      <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 h-dvh overflow-y-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl font-semibold">Create new course</h1>
            <button onClick={handlePreview} className="w-full sm:w-auto px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700">
              Preview
            </button>
          </div>

          <form onSubmit={handleSubmit((data) => onSubmit(data, false))}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Course Information</h2>
                  <div className="space-y-4">
                    {/* Title Field */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        {...register("title", { required: "Title is required" })}
                        placeholder="e.g. Introduction to Data Analysis"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Chapter & Level Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <input
                        {...register("category", { required: "Category is required" })}
                        placeholder="e.g. Machine Learning"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Duration <span className="text-red-500">*</span>
                        </label>
                        <input
                        {...register("duration", { required: "Duration is required" })}
                        placeholder="e.g. 5 Hours"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration.message}</p>}
                      </div>
                    </div>

                    {/* Description Field */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register("description", {
                          required: "Description is required",
                          minLength: { value: 20, message: "Description must be at least 20 characters" }
                        })}
                        rows="4"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
                  {faqFields.map((field, index) => (
                    <div key={field.id} className="space-y-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Question <span className="text-red-500"></span>
                        </label>
                        <input
                          // {...register(`faq.${index}.question`, { required: "Question is required" })}
                          {...register(`faq.${index}.question`)}
                          placeholder="e.g. Do you offer 1 on 1 calls?"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.faq?.[index]?.question ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.faq?.[index]?.question && <p className="mt-1 text-sm text-red-500">{errors.faq[index].question.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Answer <span className="text-red-500"></span>
                        </label>
                        <input
                          // {...register(`faq.${index}.answer`, { required: "Answer is required" })}
                          {...register(`faq.${index}.answer`)}
                          placeholder="e.g. Yes at a fixed cost per call"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.faq?.[index]?.answer ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.faq?.[index]?.answer && <p className="mt-1 text-sm text-red-500">{errors.faq[index].answer.message}</p>}
                      </div>
                      <button type="button" onClick={() => remove(index)} className="text-red-600 hover:underline">Remove FAQ</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => append({ question: '', answer: '' })} className="text-purple-600 hover:underline">Add FAQ</button>
                </div>
              </div>

              {/* Image & Video Uploads */}
              <div className="space-y-4 md:space-y-6">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Cover Image <span className="text-red-500">*</span>
                  </h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center flex flex-col items-center justify-center min-h-[8rem] md:min-h-[14rem]">
                    <Upload className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-gray-400" />
                    <button type="button" className="text-purple-600 hover:text-purple-700">Upload</button>
                  </div>
                  {errors.coverImage && <p className="mt-1 text-sm text-red-500">{errors.coverImage.message}</p>}
                </div>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Sales Video <span className="text-red-500">*</span>
                  </h2>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center flex flex-col items-center justify-center min-h-[8rem] md:min-h-[11rem]">
                    <Upload className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-gray-400" />
                    <button type="button" className="text-purple-600 hover:text-purple-700">Upload</button>
                  </div>
                  {errors.salesVideo && <p className="mt-1 text-sm text-red-500">{errors.salesVideo.message}</p>}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="relative bg-transparent p-4 pb-16 mt-1 md:mt-4 md:p-0">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 justify-end items-stretch">
                <button
                  type="button"
                  onClick={handleSubmit((data) => onSubmit(data, true))}
                  className="flex-1 sm:flex-none w-full sm:w-auto px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Save As Draft
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none w-full sm:w-auto px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <PreviewModal 
        isOpen={isPreviewOpen}
        setIsOpen={setIsPreviewOpen}
        formData={previewData}
      />
    </>
  );
};

export default CreateCourses;
