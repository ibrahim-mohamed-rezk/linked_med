'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Calendar, Eye, Clock } from 'lucide-react';

interface VideoData {
    id: string;
    title: string;
    videoUrl: string;
    thumbnail: string;
    duration: string;
    views: number;
    createdAt: Date;
    description?: string;
}

const VideoPage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime] = useState(0);
    const [duration] = useState(0);
    const [showControls, setShowControls] = useState(true);

    // Sample video data - replace with actual data
    const videoData: VideoData = {
        id: '1',
        title: 'Introduction to React Components and Modern Web Development',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://via.placeholder.com/1280x720/0061A7/ffffff?text=Video+Thumbnail',
        duration: '22:32',
        views: 1234,
        createdAt: new Date('2024-01-15'),
        description: 'Learn the fundamentals of React components and how they work in modern web development. This comprehensive tutorial covers everything from basic concepts to advanced patterns.'
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatViews = (views: number) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        } else if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (showControls) {
            timeout = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [showControls]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Video Container */}
            <div className="bg-black">
                <div className="max-w-6xl mx-auto">
                    <div
                        className="relative aspect-video bg-black group cursor-pointer"
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}
                        onMouseMove={() => setShowControls(true)}
                    >
                        {/* Video Element Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img
                                src={videoData.thumbnail}
                                alt={videoData.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={togglePlay}
                                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all duration-200 hover:scale-110"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-12 h-12 text-white" />
                                    ) : (
                                        <Play className="w-12 h-12 text-white ml-1" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Video Controls */}
                        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="bg-white/30 h-1 rounded-full overflow-hidden">
                                    <div
                                        className="bg-red-500 h-full transition-all duration-200"
                                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                                    />
                                </div>
                            </div>

                            {/* Control Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={togglePlay}
                                        className="text-white hover:text-gray-300 transition-colors"
                                    >
                                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                                    </button>

                                    <button
                                        onClick={toggleMute}
                                        className="text-white hover:text-gray-300 transition-colors"
                                    >
                                        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                    </button>

                                    <span className="text-white text-sm">
                                        {formatTime(currentTime)} / {videoData.duration}
                                    </span>
                                </div>

                                <button className="text-white hover:text-gray-300 transition-colors">
                                    <Maximize className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Information */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {videoData.title}
                    </h1>

                    {/* Video Stats */}
                    <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            <span className="font-medium">{formatViews(videoData.views)} views</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>Published on {formatDate(videoData.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>Duration: {videoData.duration}</span>
                        </div>
                    </div>

                    {/* Description */}
                    {videoData.description && (
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                            <p className="text-gray-700 leading-relaxed">
                                {videoData.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Additional Info Cards */}
                {/* <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Eye className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Views</p>
                                <p className="text-xl font-bold text-gray-900">{formatViews(videoData.views)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full">
                                <Clock className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Duration</p>
                                <p className="text-xl font-bold text-gray-900">{videoData.duration}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                                <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Published</p>
                                <p className="text-lg font-bold text-gray-900">
                                    {videoData.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default VideoPage;