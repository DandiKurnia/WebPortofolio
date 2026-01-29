<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // \Log::info('UpdateProjectRequest authorize called');
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'link' => 'nullable|url',
            'technologies' => 'required|array',
            'technologies.*' => 'string|max:255',
            'newImages' => 'nullable|array',
            'newImages.*' => 'nullable|mimes:jpeg,jpg,png,gif|max:20480',
        ];
    }

    public function messages(): array
    {
        return [
            'newImages.*.max' => '4MB.',
        ];
    }
}
