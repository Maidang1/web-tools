import { useState } from "react"
import { ofetch } from "ofetch"
import { Button } from "@mantine/core"
import { Dropzone, FileWithPath } from "@mantine/dropzone"
const MUSIC_API_URL = "https://netease-cloud-music-api-iota-weld.vercel.app"
import "./style.css"

const CloudMusicUpload = () => {
  const [_, setLogined] = useState(false)
  const [qrUrl, setQrUrl] = useState("")
  const [__, setUserData] = useState<Record<string, any>>({})
  const [cloudData, setCloudInfo] = useState<Record<string, any>[]>([])
  const checkStatus = async (key: string) => {
    const res = await ofetch(
      `${MUSIC_API_URL}/login/qr/check?key=${key}&timestamp=${Date.now()}`
    )
    return res
  }

  const getLoginStatus = async (cookie = "") => {
    const res = await ofetch(
      `${MUSIC_API_URL}/login/status?timestamp=${Date.now()}`,
      {
        method: "POST",
        body: {
          cookie,
        },
      }
    )
    if (res.data.profile) {
      const { avatarUrl, signature, nickname } = res.data.profile || {}
      setUserData({ avatarUrl, nickname, signature })
    }
    return res.data.account.id !== undefined
  }

  const cloudInfo = async (cookie = "") => {
    const res = await ofetch(
      `${MUSIC_API_URL}/user/cloud?timestamp=${Date.now()}&cookie=${cookie}`
    )

    setCloudInfo(res.data)
    console.log("cloudInfo res", res)
  }
  async function login() {
    let timer: number = -1
    const cookie = localStorage.getItem("cookie") || ""
    await getLoginStatus(cookie)
    // if (cookie && isLogin) {
    //   cloudInfo(cookie)
    //   return
    // }
    const res = await ofetch(
      `${MUSIC_API_URL}/login/qr/key?timestamp=${Date.now()}`
    )

    const key = res.data.unikey
    const qrImg = await ofetch(
      `${MUSIC_API_URL}/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`
    )
    console.log("qrImg", qrImg)
    setQrUrl(qrImg.data.qrimg)

    timer = window.setInterval(async () => {
      const statusRes = await checkStatus(key)
      if (statusRes.code === 800) {
        alert("二维码已过期,请重新获取")
        clearInterval(timer)
      }
      if (statusRes.code === 803) {
        // 这一步会返回cookie
        clearInterval(timer)
        setUserData(statusRes)
        setLogined(true)
        alert("授权登录成功")
        await getLoginStatus(statusRes.cookie)
        await cloudInfo(statusRes.cookie)
        localStorage.setItem("cookie", statusRes.cookie)
      }
    }, 3000)
  }

  const handleUploadFile = (file: FileWithPath) => {
    const formData = new FormData()
    formData.append("songFile", file)
    const cookie = localStorage.getItem("cookie") || ""
    ofetch(`${MUSIC_API_URL}/cloud?time=${Date.now()}&cookie=${cookie}`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
      // credentials: "include",
    })
  }
  return (
    <div>
      <>
        <Button onClick={login}>login</Button>
        <img src={qrUrl} alt="" className="w-[100px] h-[100px]" />
      </>
      <>
        <span>current cloud music info</span>
        {cloudData &&
          cloudData.map(({ songName, addTime }) => {
            return (
              <div>
                {songName}{" "}
                <span className="text-gray-500">
                  add on {new Date(addTime).toLocaleDateString()}
                </span>
              </div>
            )
          })}
      </>

      <div className="w-full">
        <Dropzone
          onDrop={(files) => handleUploadFile(files[0])}
          onReject={(files) => console.log("rejected files", files)}
          className="w-[500px] h-[200px] flex items-center"
          multiple={false}
        >
          <div className="flex items-center">
            <span className="i-ri-netease-cloud-music-fill text-5xl text-red-400"></span>
            <span className="text-sm font-normal text-gray-500/60 ml-4">
              Select you local music
            </span>
          </div>
        </Dropzone>
      </div>
    </div>
  )
}

export { CloudMusicUpload }
