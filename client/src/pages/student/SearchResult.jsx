import { Badge } from "@/components/ui/badge";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoadUserQuery } from "@/features/api/authApi";

const SearchResult = ({ course }) => {
  // Get the user's purchased courses
  const { data: userData, refetch } = useLoadUserQuery();

  // Always refetch user data on mount for fresh enrollment status
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Only show "Owned" if user is logged in, is a student, and has enrolledCourses
  const isLoggedIn = !!userData?.user?._id;
  const isStudent = userData?.user?.role === "student";
  const isAdmin = userData?.user?.role === "instructor";
  const purchasedCourses =
    isLoggedIn && isStudent && Array.isArray(userData?.user?.enrolledCourses)
      ? userData.user.enrolledCourses.map((c) =>
          typeof c === "string"
            ? c
            : c?._id || c?.courseId || (c && c.toString && c.toString())
        )
      : [];
  const isPurchased = isLoggedIn && isStudent && purchasedCourses.some(
    (id) => id && id.toString() === course._id.toString()
  );

  // Debug: log for troubleshooting
  console.log("SearchResult debug:", {
    enrolledCourses: userData?.user?.enrolledCourses,
    purchasedCourses,
    courseId: course._id,
    isPurchased,
  });

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnial"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
          <p className="text-sm text-gray-600">{course.subTitle}</p>
          <p className="text-sm text-gray-700">
            Intructor: <span className="font-bold">{course.creator?.name}</span>{" "}
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        {isLoggedIn && isStudent && isPurchased ? (
          <Link to={`/course-progress/${course._id}`}>
            <button className="bg-green-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">
              Owned
            </button>
          </Link>
        ) : isLoggedIn && isAdmin ? (
          <h1 className="font-bold text-lg md:text-xl">₹{course.coursePrice}</h1>
        ) : !isLoggedIn ? (
          <h1 className="font-bold text-lg md:text-xl">₹{course.coursePrice}</h1>
        ) : (
          <h1 className="font-bold text-lg md:text-xl">₹{course.coursePrice}</h1>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
