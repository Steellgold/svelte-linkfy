"use client";

import { BiBarChartSquare, BiCopy, BiLinkExternal, BiTrash } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useState, type ReactElement } from "react";
import { Card } from "#/lib/components/atoms/card";
import { Text } from "#/lib/components/atoms/text";
import { useCopyToClipboard } from "usehooks-ts";
import { HiPencilAlt } from "react-icons/hi";
import { dayJS } from "#/lib/utils/day-js";
import { Toaster, toast } from "sonner";
import Link from "next/link";

const HistoryPage = (): ReactElement => {
  const [value, copy] = useCopyToClipboard();

  type HistoryItem = {
    url: string;
    shortUrl: string;
    createdDate: string;
    clicks: number;
    lastClick?: string;
  };

  const [history] = useState<HistoryItem[]>([
    {
      url: "https://google.com",
      shortUrl: "az45",
      createdDate: "2021-07-17 20:00:00",
      clicks: 0
    },
    {
      url: "https://twitter.com",
      shortUrl: "aB2c",
      createdDate: "2021-07-17 20:00:00",
      clicks: 0
    }
  ]);

  return (
    <>
      <Toaster position="top-right" expand toastOptions={{
        style: {
          backgroundColor: "#1F2937",
          color: "#fff",
          border: "1px solid #4B5563"
        }
      }} />

      <Card size="xl">
        <div className="mb-2 p-0">
          <h1 className="mb-1 text-xl font-bold text-white md:text-2xl">See your links</h1>
          <Text>
            This is your history page, you can see all your links here, and you can also delete them.
          </Text>
        </div>

        <div className="flex flex-col mt-2">
          {history.length > 0 ? (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      URL
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Short URL
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Clicks
                    </th>
                    <th scope="col" className="px-6 py-3 sr-only">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index} className="border-b bg-gray-800 border-gray-600">
                      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                        {item.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").substring(0, 10)}...
                      </td>
                      <td className="px-6 py-4">
                        {item.shortUrl.substring(0, 4)}{item.shortUrl.length > 4 ? "..." : ""}
                      </td>
                      <td className="px-6 py-4">
                        {dayJS(item.createdDate).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className="px-6 py-4">
                        {item.clicks}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 text-gray-400">
                          <Link href={item.url}>
                            <BiLinkExternal className="h-5 w-5 hover:text-white transition-colors duration-200" />
                          </Link>
                          <Link href={`/${item.shortUrl}/stats`}>
                            <BiBarChartSquare className="h-5 w-5 hover:text-white transition-colors duration-200" />
                          </Link>
                          <BiTrash className="h-5 w-5 hover:text-white transition-colors duration-200" />
                          <Link href={`/${item.shortUrl}/edit`}>
                            <HiPencilAlt className="h-5 w-5 hover:text-white transition-colors duration-200" />
                          </Link>
                          <BiCopy
                            className="h-5 w-5 hover:text-white transition-colors duration-200"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={async() => {
                              await copy(item.shortUrl);
                              if (value) {
                                toast("Copied to clipboard!", {
                                  icon: <BsFillCheckCircleFill />
                                });
                              }
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Text>
                You don&apos;t have any shortened links yet.
              </Text>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default HistoryPage;