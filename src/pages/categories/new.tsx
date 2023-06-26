import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense, useState } from "react"
import { useDropzone } from "react-dropzone"
import { MdOutlineModeEditOutline } from "react-icons/md"
import { CategoryForm, FORM_ERROR } from "src/categories/components/CategoryForm"
import createCategory from "src/categories/mutations/createCategory"
import { CreateCategorySchema } from "src/categories/schemas"
import Layout from "src/core/layouts/Layout"

import { BlitzPage } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Mediatype, Status } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import FormInput from "@src/core/components/common/Input/FormInput"
import Card from "@src/core/components/global/Card"
import LoadingOverlay from "@src/core/components/global/LoadingOverlay"
import useUploadFileToCloudinary from "@src/core/hooks/useUploadFileToCloudinary"

const initialValues = {
  description: "",
  name: "",
  status: "DRAFT" as Status,
  tags: "",
  Media: { create: { url: "", type: "IMAGE" as Mediatype } },
}

const generateImageUrl = (url: string, theme: string | undefined) => {
  if (url) return url
  return theme === "dark" ? "/svg/blank-image-dark.svg" : "/svg/blank-image.svg"
}

const NewCategoryPage: BlitzPage = () => {
  const [avatarImage, setAvatarImage] = useState("")
  const { isUploading, uploadImage } = useUploadFileToCloudinary()
  const router = useRouter()
  const [createCategoryMutation, { isLoading }] = useMutation(createCategory)
  const { theme } = useTheme()
  const { getRootProps, open } = useDropzone({
    accept: {
      "image/*": [".png", ".PNG", ".jpg", ".JPG", ".jpeg", ".JPEG"],
    },
    onDrop: (acceptedFiles) => {
      const reader = new FileReader()
      if (acceptedFiles[0]) {
        reader.readAsDataURL(acceptedFiles[0])
        reader.onload = () => {
          setAvatarImage(reader.result as string)
        }
      }
    },
    noClick: true,
  })

  return (
    <Layout title={"Create New Category"}>
      <div className="w-full">
        <h1>Create New Category</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <LoadingOverlay isOpen={isLoading || isUploading} />
          <CategoryForm
            submitText="Create Category"
            schema={CreateCategorySchema}
            initialValues={initialValues}
            onSubmit={async (values) => {
              try {
                const res = await uploadImage({
                  contentType: "image",
                  file: avatarImage,
                  public_id: "category",
                })
                const newValue = { ...values, Media: { create: { url: res.secure_url } } }
                const category = await createCategoryMutation(newValue)
                await router.push(Routes.ShowCategoryPage({ categoryId: category.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          >
            {/* Full form here */}
            <div className="flex gap-5">
              {/* Thumbnail, Status, Tags */}
              <div className="flex flex-col gap-7 w-72">
                {/* Thumbnail */}
                <Card
                  className="p-7"
                  title="Thumbnail"
                  description="Set the category thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted"
                  footerClassName="text-center p-0"
                  contentClassName="flex items-center justify-center p-0"
                  headerClassName="p-0"
                >
                  <div
                    {...getRootProps()}
                    className="bg-[#e5e7eb] dark:bg-[#151521] rounded-md m-2 shadow-2xl relative"
                  >
                    <Button
                      type="button"
                      onClick={open}
                      aria-label="change-avatar"
                      className="absolute -top-3 -right-3 rounded-full p-2 h-7 bg-gray-200 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-gray-300 shadow-2xl text-black"
                    >
                      <MdOutlineModeEditOutline className="w-[14px] h-[14px]" />
                    </Button>
                    <Image
                      className="rounded-md w-36 h-36"
                      src={`${generateImageUrl(avatarImage, theme)}`}
                      alt="placeholder"
                      width={200}
                      height={200}
                    />
                  </div>
                </Card>

                <FormInput
                  type="text"
                  className="border"
                  name="name"
                  label="Name"
                  placeholder="Name"
                />
                <FormInput
                  type="text"
                  className="border"
                  name="description"
                  label="Description"
                  placeholder="Name"
                />
                <FormInput
                  type="text"
                  className="border"
                  name="status"
                  label="Status"
                  placeholder="Name"
                />
                <FormInput
                  type="text"
                  className="border"
                  name="tags"
                  label="Tags"
                  placeholder="Name"
                />
              </div>
            </div>

            <Button className="border" type="submit">
              Create Category
            </Button>
          </CategoryForm>
        </Suspense>
        <p>
          <Link href={Routes.CategoriesPage()}>Categories</Link>
        </p>
      </div>
    </Layout>
  )
}

NewCategoryPage.authenticate = true

export default NewCategoryPage
