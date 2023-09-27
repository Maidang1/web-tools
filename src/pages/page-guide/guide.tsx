import { SimpleGrid, Badge } from "@mantine/core"
export const PageGuide = () => {
  return (
    <>
      <header className="text-3xl text-center dark:text-white">
        Self-use tool collection website
      </header>
      <SimpleGrid cols={2} verticalSpacing="lg" className="mt-4">
        <div className="m-auto border-2 border-pink-300 rounded p-4 mb-4 hover:shadow-lg hover:border-pink-600 bg-white api-card ">
          <div className="flex justify-between mb-2 items-start">
            <div className="flex -mx-2 sm:-mx-4 sm:items-center w-12/12 min-w-full">
              <div className="px-2 sm:mx-4 flex-shrink-0 sm:w-2/12">
                <a href="/cloud-music-upload" className="pointer-events-none">
                  <span className="i-ri-netease-cloud-music-fill text-red-500 text-7xl"></span>
                </a>
              </div>
              <div className="flex flex-col mx-4  sm:w-10/12">
                <div className="sm:mb-4 mb-1 sm:text-xl text-md flex flex-wrap items-center -mx-1">
                  <span className="px-1 capitalize hover:underline">
                    <a
                      href="/cloud-music-upload"
                      className="pointer-events-none"
                    >
                      Music web disk Upload
                    </a>
                  </span>
                </div>
                <div className=" sm:mb-4 text-gray-500 sm:w-4/5 w-5/5 text-sm sm:text-base">
                  upload you local music to netease cloud music
                </div>
                <div className="sm:flex hidden text-gray-500 flex-wrap">
                  <Badge
                    size="sm"
                    variant="gradient"
                    gradient={{ from: "cyan", to: "indigo", deg: 61 }}
                  >
                    Music
                  </Badge>
                  <Badge className="ml-2" size="sm" color="pink">
                    Not available
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SimpleGrid>
    </>
  )
}
