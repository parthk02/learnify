import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";
import { useLoadUserQuery } from "@/features/api/authApi";

const Course = ({ course }) => {
  if (!course) return null; // Safety check for course prop

  // Get the user's purchased courses
  const { data: userData } = useLoadUserQuery();
  const isLoggedIn = !!userData?.user;
  const isStudent = userData?.user?.role === "student";
  const purchasedCourses = isLoggedIn && isStudent && Array.isArray(userData?.user?.enrolledCourses)
    ? userData.user.enrolledCourses.map((c) => (typeof c === "string" ? c : c._id))
    : [];
  const isPurchased = isLoggedIn && isStudent && purchasedCourses.some(
    (id) => id && id.toString() === course._id.toString()
  );

  // Always link to course detail page for students
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course.courseThumbnail || "https://via.placeholder.com/400x200"} // Placeholder image if thumbnail is missing
            alt="course thumbnail"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="hover:underline font-bold text-lg truncate">
              {course.courseTitle || "Untitled Course"}
            </h1>
            <div className="text-lg font-bold ml-4">
              {isLoggedIn && isStudent && isPurchased ? (
                <span className="bg-green-800 text-white text-sm px-2 py-0.5 rounded-md">Owned</span>
              ) : (
                <span>₹{course.coursePrice || "0"}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                alt={course.creator?.name || "Creator"}
              />
              <AvatarFallback>{course.creator?.name?.slice(0, 2) || "CN"}</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">
              {course.creator?.name || "Unknown Creator"}
            </h1>
          </div>
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            {course.courseLevel || "Beginner"}
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
