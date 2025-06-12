"use client";

import Image from "next/image";

import {
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  TrendingUp,
  DollarSign,
  Globe,
  Calendar,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { IUser } from "@/interfaces";
import { formatDateRange, getProficiencyColor } from "@/utils/helpers";
import useTalentDetails from "@/hooks/useTalentDetails";

interface TalentDetailsProps {
  user: IUser;
}

export default function TalentDetails({ user }: TalentDetailsProps) {
  const { genome, loading, error } = useTalentDetails(user);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-center p-8">
        <div>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading Profile...
          </h3>
          <p className="text-gray-600">Fetching detailed profile information</p>
        </div>
      </div>
    );
  }

  // Error state or no genome data
  if (error || !genome) {
    return (
      <div className="flex items-center justify-center h-full text-center p-8">
        <div>
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Profile Unavailable
          </h3>
          <p className="text-gray-600 mb-4">
            {error || "Unable to load detailed profile information."}
          </p>
          <a
            href={`https://torre.ai/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <span>View on Torre</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Image
              src={
                genome.person.picture ||
                user.imageUrl ||
                "/placeholder.svg?height=80&width=80"
              }
              alt={genome.person.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-white/20"
            />
            {genome.person.verified && (
              <CheckCircle className="w-5 h-5 text-blue-300 absolute -bottom-1 -right-1 bg-white rounded-full" />
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">{genome.person.name}</h2>
            <p className="text-blue-100 mb-2">
              @{genome.person.username || user.username}
            </p>
            <p className="text-white/90 text-sm mb-2">
              {genome.person.professionalHeadline}
            </p>
            {genome.person.location && (
              <div className="flex items-center text-white/80 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {genome.person.location.name}
              </div>
            )}
          </div>

          <a
            href={`https://torre.ai/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors text-sm"
          >
            <span>View Profile</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-8">
          {/* Overview Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
              <Star className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
            </div>

            {genome.person.summaryOfBio && (
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-3">
                  About
                </h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {genome.person.summaryOfBio}
                </p>
              </div>
            )}

            {genome.person.links && genome.person.links.length > 0 && (
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-3">
                  Links
                </h4>
                <div className="space-y-2">
                  {genome.person.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.address}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="capitalize">{link.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {genome.languages && genome.languages.length > 0 && (
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-3">
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {genome.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {lang.language} ({lang.fluency.replace("-", " ")})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Experience Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Experience
              </h3>
            </div>

            {genome.jobs && genome.jobs.length > 0 && (
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                  Work Experience
                </h4>
                <div className="space-y-4">
                  {genome.jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-gray-50 p-4 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">
                            {job.name}
                          </h5>
                          {job.organizations &&
                            job.organizations.length > 0 && (
                              <div className="flex items-center mt-1 space-x-2">
                                {job.organizations[0].picture && (
                                  <Image
                                    src={job.organizations[0].picture}
                                    alt={job.organizations[0].name}
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 rounded object-cover"
                                  />
                                )}
                                <span className="text-sm text-gray-700">
                                  {job.organizations[0].name}
                                </span>
                              </div>
                            )}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDateRange(
                            job.fromMonth,
                            job.fromYear,
                            job.toMonth,
                            job.toYear
                          )}
                        </div>
                      </div>
                      {job.additionalInfo && (
                        <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                          {job.additionalInfo}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {genome.education && genome.education.length > 0 && (
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
                  Education
                </h4>
                <div className="space-y-4">
                  {genome.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="bg-gray-50 p-4 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">
                            {edu.name}
                          </h5>
                          {edu.organizations &&
                            edu.organizations.length > 0 && (
                              <div className="flex items-center mt-1 space-x-2">
                                {edu.organizations[0].picture && (
                                  <Image
                                    src={edu.organizations[0].picture}
                                    alt={edu.organizations[0].name}
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 rounded object-cover"
                                  />
                                )}
                                <span className="text-sm text-gray-700">
                                  {edu.organizations[0].name}
                                </span>
                              </div>
                            )}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.fromYear} - {edu.toYear}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Skills Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Skills & Strengths
              </h3>
            </div>

            {genome.strengths && genome.strengths.length > 0 && (
              <div className="grid grid-cols-1 gap-3">
                {genome.strengths.slice(0, 20).map((strength) => (
                  <div
                    key={strength.id}
                    className={`p-3 rounded-lg border ${getProficiencyColor(
                      strength.proficiency
                    )}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{strength.name}</span>
                      <span className="text-xs font-semibold capitalize">
                        {strength.proficiency?.replace("-", " ") || "Unknown"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preferences Section */}
          {genome.preferences && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Job Preferences
                </h3>
              </div>

              <div className="space-y-4">
                {genome.preferences.jobsFullTime?.active && (
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <h4 className="font-semibold text-green-900 mb-2">
                      Full-time Positions
                    </h4>
                    <p className="text-green-700 text-sm mb-2">
                      Available for full-time opportunities
                    </p>
                    {genome.preferences.jobsFullTime.desirableCompensation && (
                      <p className="text-green-800 font-medium">
                        Desired:{" "}
                        {
                          genome.preferences.jobsFullTime.desirableCompensation
                            .currency
                        }{" "}
                        {
                          genome.preferences.jobsFullTime.desirableCompensation
                            .amount
                        }
                        /
                        {
                          genome.preferences.jobsFullTime.desirableCompensation
                            .periodicity
                        }
                      </p>
                    )}
                  </div>
                )}

                {genome.preferences.flexibleJobs?.active && (
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Flexible/Contract Work
                    </h4>
                    <p className="text-blue-700 text-sm mb-2">
                      Available for flexible arrangements
                    </p>
                    {genome.preferences.flexibleJobs.desirableCompensation && (
                      <p className="text-blue-800 font-medium">
                        Desired:{" "}
                        {
                          genome.preferences.flexibleJobs.desirableCompensation
                            .currency
                        }{" "}
                        {
                          genome.preferences.flexibleJobs.desirableCompensation
                            .amount
                        }
                        /
                        {
                          genome.preferences.flexibleJobs.desirableCompensation
                            .periodicity
                        }
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/*
 * CONVERTED TO CLIENT COMPONENT:
 *
 * Changes made:
 * 1. Added "use client" directive at the top
 * 2. Replaced async server component with client component using useTalentDetails hook
 * 3. Added proper loading state with spinner animation
 * 4. Enhanced error handling with user-friendly messages
 * 5. Maintained all existing functionality and UI
 * 6. Added Loader2 icon for better loading UX
 *
 * Benefits:
 * - Better user experience with loading states
 * - Client-side data fetching for more responsive UI
 * - Proper error handling and user feedback
 * - Separation of concerns with custom hook
 */
