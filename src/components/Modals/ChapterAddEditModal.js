import React from 'react';
import { X, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ChapterAddEditModal = ({ isOpen, onClose, chapter, courseId, onSave }) => {
  const isEditing = Boolean(chapter?.id);
  const defaultValues = {
    title: chapter?.title || '',
    description: chapter?.description || '',
    duration: chapter?.duration || '',
    courseId: courseId || chapter?.courseId
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    defaultValues
  });

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const endpoint = isEditing 
        ? `/api/chapters/${chapter.id}`
        : '/api/chapters';

      const method = isEditing ? 'PUT' : 'POST';
      
      // Convert duration to number and include courseId
      const payload = {
        ...data,
        duration: data.duration ? parseInt(data.duration, 10) : null,
        courseId: courseId || chapter?.courseId
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save chapter');
      }

      const savedChapter = await response.json();
      onSave(savedChapter);
      onClose();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Failed to save chapter. Please try again.'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Chapter' : 'Create Chapter'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 space-y-4">
            {errors.root && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg">
                {errors.root.message}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Chapter Title
              </label>
              <input
                {...register('title', { 
                  required: 'Title is required',
                  minLength: { 
                    value: 3, 
                    message: 'Title must be at least 3 characters' 
                  }
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows="3"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Duration (minutes)
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  {...register('duration', {
                    min: { value: 1, message: 'Duration must be at least 1 minute' },
                    valueAsNumber: true
                  })}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter duration in minutes"
                />
              </div>
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          <div className="p-4 border-t flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChapterAddEditModal;