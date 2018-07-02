<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\ImageCRUDContract;
use App\ModelRepositoryInterfaces\UserModelRepositoryInterface;
use App\Models\ImagePriority;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;

/**
 * Intervention implementation of image CRUD.
 */
class ImageCRUDService implements ImageCRUDContract
{
    protected $userModelRepository = null;

    public function __construct(UserModelRepositoryInterface $userModelRepository)
    {
        $this->userModelRepository = $userModelRepository;
    }

    /** Image uploading functionality. */
    public function upload()
    {
        $id = request()->id;
        $directory = env('IMAGE_UPLOAD_LOCATION') . request()->uri;
        $savedImage = $directory . '/likeness.jpg';

        $manager = new ImageManager(['driver' => 'imagick']);

        $image = $manager->make(request()->photo);
        if (!File::exists($directory)) {
            File::makeDirectory($directory, true);
        }

        if (null !== $image->save($savedImage)) {
            $this->clearCache($id);

            return [
                'status' => true,
            ];
        }

        return [
            'status' => false,
        ];
    }

    /** Retrieve image priority
     * @param $student_ids
     *
     * @return array
     */
    public function getPriority($student_ids)
    {
        $array = [];
        $out = [];

        foreach ($student_ids as $student_id) {
            \array_push($array, 'members:' . $student_id);
        }

        $users = $this->userModelRepository->getUsersWithImagePriority($array);

        foreach ($users as $user) {
            if ($user['image_priority'] && $user['image_priority']['user_id'] == auth()->user()->user_id) {
                \array_push($out, $user['image_priority']['image_priority']);
            } else {
                \array_push($out, 'likeness');
            }
        }

        return $out;
    }

    /** Update image_priority table */
    public function updatePriority()
    {
        $facultyID = request()->faculty_id;
        $priority = ImagePriority::updateOrCreate(
            ['user_id' => $facultyID, 'student_id' => request()->student_id],
            ['image_priority' => request()->image_priority]
        );

        $this->clearCache($facultyID);
    }

    private function clearCache($facultyID)
    {
        $msg = $facultyID;

        for ($i = 0; $i < 10; ++$i) {
            if (Cache::has('students:' . $i . ':' . $facultyID)) {
                Cache::forget('students:' . $i . ':' . $facultyID);
                $msg .= "forgot students\n";
            }
            if (Cache::has('courses:' . $facultyID)) {
                Cache::forget('courses:' . $facultyID);
                $msg .= "forgot courses\n\n";
            }
        }

        return $msg;
    }
}
