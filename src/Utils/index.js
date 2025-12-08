// imageUpload.js


export const uploadImageToImgBB = async (file) => {
  if (!file) throw new Error('No file provided for upload.')

  const formData = new FormData()
  formData.append('image', file)

  const imgbbAPIKey = import.meta.env.VITE_IMGBB_API
  if (!imgbbAPIKey) throw new Error('ImgBB API key is missing!')

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
    method: 'POST',
    body: formData
  })

  const data = await response.json()

  if (!data.success) {
    console.error('ImgBB upload error:', data)
    throw new Error('Failed to upload image to ImgBB.')
  }

  return data.data.url
}
