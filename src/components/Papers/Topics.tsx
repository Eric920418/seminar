import { QRCodeCanvas } from "qrcode.react";
import Image from "next/Image";
import Link from "next/link";
export const Topics = () => {
  return (
    <div className="flex flex-col w-full max-w-[976px]">
      <div className="text-16M text-primary">Topics & Paper Format</div>
      <div className="relative">
        <div className="text-black text-48M  relative z-10">
          徵文主題與論文格式
        </div>
        <div className="z-0 transform translate-y-[-20px]">
          <Image
            src="/標題/Rectangle 249.svg"
            alt="Rectangle"
            width={200}
            height={10}
          />
        </div>
      </div>
      <div className="mt-[64px]">
        <div className="text-secondary text-20M ">學術論文發表</div>
        <div className="mt-[24px] text-[#252F38B2] text-16R ">
          (一)領域教材教法研究學術論文獎獲獎論文發表
          結合師資培育暨藝術教育司辦理之領域教材教法研究學術論文獎
          勵計畫，年度獲獎論文共 9 件，邀請進行學術論文發表，期能提升
          各領域教材教法研究質量，並促進師資培育之大學高品質學術研究 交流。
          (二)師資培育與領域教材教法論文發表
          以公開徵稿及邀稿之方式，徵求與研討會議題相關之論文，進行口
          頭或海報(書面)發表與分享，會後彙整具實務應用與參考價值之
          研究論文成果，供相關領域(群科)教學研究中心以及各師培大學
          教材教法課程參考。
        </div>
      </div>
      <div className="mt-[64px] grid grid-cols-2 gap-[32px] ">
        <div className="flex flex-col gap-[32px] ">
          <div className="bg-white p-[32px] rounded-[24px]">
            <div className="text-secondary text-20M ">徵稿主題</div>
            <div className="mt-[24px] text-black text-15R  ">
              聚焦於本次研討會的主軸「師資培育的關鍵驅動力：精進 x 特色 x
              師培USR」，本研討會的徵稿子題如下：
            </div>
            <div className="mt-[16px] text-black text-15R  ">
              一、師資培育精進／特色／師培USR的學理基礎 <br />
              二、師資培育精進／特色／師培USR與教師專業成長 <br />
              三、師資培育精進／特色／師培USR與區域網絡建置 <br />
              四、師資培育精進／特色／師培USR的場域協作模式 <br />
              五、師資培育精進／特色／師培USR的課程與教學 <br />
              六、師資培育精進／特色／師培USR的實踐研究 <br />
              七、師資培育精進／特色／師培USR與偏鄉教育 <br />
              八、師資培育精進／特色／師培USR與永續教育 <br />
              九、師資培育精進／特色／師培USR與社會實踐 <br />
              十、師資培育精進／特色／師培USR的成效評估機制 <br />
              十一、其他與師資培育有關的議題 <br />
              （如：教育實習，教學實習，師資培育政策，領域教材教法等相關議題）
            </div>
          </div>
          <div className="bg-white p-[32px] rounded-[24px] flex-1">
            <div className="text-secondary text-20M ">投稿方式</div>
            <div className="mt-[24px] flex space-x-[16px]">
              <div className="text-black text-15R ">
                填妥
                <span>
                  <Link
                    href="https://2024icte.nptu.edu.tw/wp-content/uploads/2024/04/%E9%99%84%E4%BB%B61-%E6%8A%95%E7%A8%BF%E8%80%85%E5%80%8B%E4%BA%BA%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%99.odt"
                    className="text-blue-500 underline text-16R  break-all mt-[4px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    投稿者基本資料表（點此下載附件1）
                  </Link>
                </span>
                及
                <span>
                  <Link
                    href="https://2024icte.nptu.edu.tw/wp-content/uploads/2024/04/%E9%99%84%E4%BB%B62-%E8%AB%96%E6%96%87%E6%91%98%E8%A6%81%E6%A0%BC%E5%BC%8F.odt"
                    className="text-blue-500 underline text-16R  break-all mt-[4px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    論文摘要格式（點此下載附件2）
                  </Link>
                </span>
                後，上傳至
                <span>
                  <Link
                    href="https://reurl.cc/lgmjKQ"
                    className="text-blue-500 underline text-16R  break-all mt-[4px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://reurl.cc/lgmjKQ
                  </Link>
                </span>
                ，亦可掃描投稿QRcode上傳。
              </div>
              <div>
                <QRCodeCanvas
                  value="https://docs.google.com/forms/d/e/1FAIpQLSc2AvzE7FW7m6926a6MI-ffdSeeQ40pjPWg8EmwBOfZadEnUw/closedform"
                  size={110}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[32px] ">
          <div className="bg-white p-[32px] rounded-[24px]">
            <div className="text-secondary text-20M ">徵稿對象</div>
            <div className="mt-[24px] text-black text-15R  ">
              國內外學者專家、教學現場教師或相關系所研究生，
              <span className="text-primary">免報名費！</span>
            </div>
          </div>
          <div className="bg-white p-[32px] rounded-[24px]">
            <div className="text-secondary text-20M ">審查結果通知日期</div>
            <div className="mt-[24px] text-black text-15R  ">
              2024年6月21日（星期五）17時前以E-mail郵件通知（屆時請留意信箱訊息），並同步公布於國立屏東大學師資培育中心網站（網址：
              <span>
                <Link
                  href="https://cte.nptu.edu.tw"
                  className="text-blue-500 underline text-16R  break-all mt-[4px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://cte.nptu.edu.tw
                </Link>
              </span>
              ）
            </div>
          </div>
          <div className="bg-white p-[32px] rounded-[24px] flex-1">
            <div className="text-secondary text-20M ">投稿形式：論文摘要</div>
            <div className="mt-[24px] text-black text-15R  ">
              (一) 截稿日期：2025年6月7日（星期五） 23:59 止 <br />
              (二)
              摘要字數（中、英文摘要並陳）：中文摘要字數1000字以內，英文摘要字數600字以內
              <br />
              (三) 摘要內容（可視發表主題彈性修改）：
              <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 論文題目{" "}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.
              研究動機、目的（或教學源起） <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.
              研究方法（或教學方法）
              <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.
              研究結果（或教學成效）
              <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.
              研究貢獻及建議（或未來展望）
              <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.
              關鍵字(3-5個)
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[32px]">
        <div className="bg-white p-[32px] rounded-[24px]">
          <div className="text-secondary text-20M ">入選稿件之注意事項</div>
          <div className="mt-[24px] text-black text-15R  ">
            (一)凡通過審查者，請於2025年7月5日(星期五)23:59前送交修正後論文摘要（根據審查意見修改）
            <br />
            (二) 口頭發表者，請於2025年9月6日(星期五)23:59前上傳簡報檔。簡報檔相關規定詳見
            <span>
              <Link
                href="https://2024icte.nptu.edu.tw/wp-content/uploads/2024/04/%E9%99%84%E4%BB%B63-%E7%B0%A1%E5%A0%B1%E7%9B%B8%E9%97%9C%E8%A6%8F%E5%AE%9A.odt"
                className="text-blue-500 underline text-16R  break-all mt-[4px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                附件3。
              </Link>
            </span>
            <br />
            (三) 海報發表者，請於2025年8月16日(星期五)23:59前上傳繳交海報全文PDF檔，並於2025年9月6日(星期五)前以掛號寄至（或親自送交）國立屏東大學師資培育中心。海報檔相關規定詳見
            <span>
              <Link
                href="https://2024icte.nptu.edu.tw/wp-content/uploads/2024/04/%E9%99%84%E4%BB%B64-%E6%B5%B7%E5%A0%B1%E7%9B%B8%E9%97%9C%E8%A6%8F%E5%AE%9A.odt"
                className="text-blue-500 underline text-16R  break-all mt-[4px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                附件4。
              </Link>
            </span>
            <br />
            (四)
            簽署論文授權書及個人基本資料（姓名、學歷、現職、地址、電話、傳真或電子郵件信箱）等，授權書請見{" "}
            <span>
              <Link
                href="https://2024icte.nptu.edu.tw/wp-content/uploads/2024/04/%E9%99%84%E4%BB%B65-%E8%AB%96%E6%96%87%E6%91%98%E8%A6%81%E6%8E%88%E6%AC%8A%E6%9B%B8.odt"
                className="text-blue-500 underline text-16R  break-all mt-[4px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                附件5。
              </Link>
            </span>
            <br />
            (五)
            文責版權：論文需未曾發表於其他研討會或期刊。論文經錄取後，稿件作者須無條件授權本研討會以紙本、光碟、微縮或其他數位化方式重製宣傳或上載研討會網站供參與者下載。
          </div>
        </div>
      </div>
      <div className="mt-[32px]">
        <div className="bg-white p-[32px] rounded-[24px]">
          <div className="text-secondary text-20M ">聯絡窗口</div>
          <div className="mt-[24px] text-black text-15R ">
            聯絡人：國立臺北教育大學師資培育中心 <br />
            專案助理 聯繫方式：08-7663800 <br />轉 22104
            E-mail︰nptuicte12@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};
