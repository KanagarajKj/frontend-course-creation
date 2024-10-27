import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Edit2, Trash2, GripVertical, CheckCircle, Eye, Book } from 'lucide-react';
import TopicEditModal from './Modals/TopicEditModal';
import { Link } from 'react-router-dom';
import { useGetCourseUserByIdQuery } from '../services/courseApi';


const MyCourses = () => {
  const userId = localStorage.getItem('userId'); // Ensure this is the correct userId
  const { data, error, isLoading } = useGetCourseUserByIdQuery(userId);

  console.log(data,'data')

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to React',
      isOpen: true,
      chapters: [
        {
          id: 1,
          title: 'Chapter 1: React Basics',
          isOpen: true,
          topics: [
            { id: 1, title: 'Getting Started with React', isCompleted: false },
            { id: 2, title: 'Components and Props', isCompleted: false },
            { id: 3, title: 'State and Lifecycle', isCompleted: false },
          ]
        }
      ]
    }
  ]);

  // Handler for editing topics
  const handleEditTopic = (courseId, chapterId, topic) => {
    setSelectedTopic({ ...topic, courseId, chapterId });
    setIsEditModalOpen(true);
  };

  // Handler for deleting topics
  const handleDeleteTopic = (courseId, chapterId, topicId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: course.chapters.map(chapter => {
            if (chapter.id === chapterId) {
              return {
                ...chapter,
                topics: chapter.topics.filter(topic => topic.id !== topicId)
              };
            }
            return chapter;
          })
        };
      }
      return course;
    }));
  };

  // Handler for toggling topic completion
  const handleToggleComplete = (courseId, chapterId, topicId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: course.chapters.map(chapter => {
            if (chapter.id === chapterId) {
              return {
                ...chapter,
                topics: chapter.topics.map(topic =>
                  topic.id === topicId
                    ? { ...topic, isCompleted: !topic.isCompleted }
                    : topic
                )
              };
            }
            return chapter;
          })
        };
      }
      return course;
    }));
  };

  // Handler for deleting chapters
  const handleDeleteChapter = (courseId, chapterId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: course.chapters.filter(chapter => chapter.id !== chapterId)
        };
      }
      return course;
    }));
  };

  // Handler for adding a new course
  const addCourse = () => {
    const newCourse = {
      id: Date.now(),
      title: `New Course ${courses.length + 1}`,
      isOpen: true,
      chapters: []
    };
    setCourses([...courses, newCourse]);
  };

  // Handler for deleting a course
  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  // Toggle course expansion
  const toggleCourse = (courseId) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, isOpen: !course.isOpen }
        : course
    ));
  };

  // Toggle chapter expansion
  const toggleChapter = (courseId, chapterId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: course.chapters.map(chapter =>
            chapter.id === chapterId
              ? { ...chapter, isOpen: !chapter.isOpen }
              : chapter
          )
        };
      }
      return course;
    }));
  };

  // Add new chapter to a course
  const addChapter = (courseId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const newChapter = {
          id: Date.now(),
          title: `Chapter ${course.chapters.length + 1}`,
          isOpen: true,
          topics: [
            { id: Date.now(), title: 'New Topic', isCompleted: false }
          ]
        };
        return {
          ...course,
          chapters: [...course.chapters, newChapter]
        };
      }
      return course;
    }));
  };

  // Add new topic to a chapter
  const addTopic = (courseId, chapterId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          chapters: course.chapters.map(chapter => {
            if (chapter.id === chapterId) {
              const newTopic = {
                id: Date.now(),
                title: `Topic ${chapter.topics.length + 1}`,
                isCompleted: false
              };
              return {
                ...chapter,
                topics: [...chapter.topics, newTopic]
              };
            }
            return chapter;
          })
        };
      }
      return course;
    }));
  };

  // Topic component
  const Topic = ({ topic, courseId, chapterId }) => (
    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg group">
      <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
      <div className="flex-1 flex items-center justify-between">
        <span className="text-sm font-medium text-blue-600">
          {topic.title}
        </span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-1 hover:bg-blue-100 rounded"
            aria-label="View topic"
          >
            <Eye className="w-4 h-4 text-blue-600" />
          </button>
          <button 
            className="p-1 hover:bg-blue-100 rounded"
            onClick={() => handleEditTopic(courseId, chapterId, topic)}
            aria-label="Edit topic"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
          </button>
          <button 
            className="p-1 hover:bg-blue-100 rounded"
            onClick={() => handleDeleteTopic(courseId, chapterId, topic.id)}
            aria-label="Delete topic"
          >
            <Trash2 className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => handleToggleComplete(courseId, chapterId, topic.id)}
            className="p-1 hover:bg-blue-100 rounded"
            aria-label={topic.isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            <CheckCircle 
              className={`w-5 h-5 ${topic.isCompleted ? 'text-blue-600' : 'text-gray-300'}`} 
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8 bg-gray-50 h-dvh overflow-y-scroll">
      <div className="max-w-8xl mx-auto space-y-6">
        <div className='w-max'>
          <Link
          // onClick={addCourse}
          to="/create-courses"
          className="px-4 py-2 text-sm bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </Link>
        </div>

        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-purple-100">
              {/* Course Header */}
              <div
                className="bg-purple-50 p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleCourse(course.id)}
              >
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-purple-600" />
                  <h2 className="font-medium text-purple-600">{course.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-1 hover:bg-purple-100 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add course edit handler
                    }}
                  >
                    <Edit2 className="w-4 h-4 text-purple-600" />
                  </button>
                  <button 
                    className="p-1 hover:bg-purple-100 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCourse(course.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-purple-600" />
                  </button>
                  {course.isOpen ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </div>

              {course.isOpen && (
                <div className="p-4 space-y-4">
                  {/* Add Chapter Button */}
                  <button
                    onClick={() => addChapter(course.id)}
                    className="w-full sm:w-auto px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Chapter</span>
                  </button>

                  {/* Chapters */}
                  <div className="space-y-4">
                    {course.chapters.map((chapter) => (
                      <div key={chapter.id} className="bg-white rounded-lg shadow-sm border border-red-100">
                        <div
                          className="bg-red-50 p-4 flex items-center justify-between cursor-pointer"
                          onClick={() => toggleChapter(course.id, chapter.id)}
                        >
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-5 h-5 text-gray-500 cursor-move" />
                            <h3 className="font-medium text-red-600">{chapter.title}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              className="p-1 hover:bg-red-100 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Add chapter edit handler
                              }}
                            >
                              <Edit2 className="w-4 h-4 text-red-600" />
                            </button>
                            <button 
                              className="p-1 hover:bg-red-100 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChapter(course.id, chapter.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                            {chapter.isOpen ? (
                              <ChevronUp className="w-5 h-5 text-red-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                        </div>

                        {chapter.isOpen && (
                          <div className="p-4 space-y-3">
                            {chapter.topics.map((topic) => (
                              <Topic 
                                key={topic.id} 
                                topic={topic} 
                                courseId={course.id}
                                chapterId={chapter.id} 
                              />
                            ))}

                            <button
                              onClick={() => addTopic(course.id, chapter.id)}
                              className="w-full flex items-center justify-center gap-2 p-3 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add Topic</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <TopicEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        topic={selectedTopic}
      />
    </div>
  );
};

export default MyCourses;