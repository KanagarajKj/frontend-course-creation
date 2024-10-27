import React from 'react';
import { X, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';

const TopicAddEditModal = ({ isOpen, onClose, topic }) => {
  const defaultValues = {
    title: topic?.title || '',
    description: topic?.description || '',
    content: topic?.content || '',
    attachments: topic?.attachments || []
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({ defaultValues });

  const isEditing = Boolean(topic?.id);

  const onSubmit = async (data) => {
    try {
      const endpoint = isEditing ? `/api/topics/${topic.id}` : '/api/topics';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save topic');
      }

      const savedTopic = await response.json();
      onClose();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Failed to save topic. Please try again.',
      });
    }
  };

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    // Handle file drop logic here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Topic' : 'Create Topic'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Topic Title</label>
              <input
                {...register('title', {
                  required: 'Title is required',
                  minLength: { value: 3, message: 'Title must be at least 3 characters' },
                })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                {...register('description')}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows="6"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Attachments</label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <button type="button" className="text-blue-600 hover:text-blue-700">
                    Upload Files
                  </button>
                  <p className="text-sm text-gray-500 mt-1">or drag and drop files here</p>
                </div>
              </div>
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

export default TopicAddEditModal;
