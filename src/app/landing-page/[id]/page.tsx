"use client";

import Image from "next/image";
import React from "react";
import styles from "./page.module.css";
import { CreatePageBody } from "@/interface/index";

interface HeaderItem {
  title: string;
  link?: string;
  open?: boolean;
  children?: HeaderItem[] | never[];
}

interface Tag {
  label: string;
  value: string;
}

const headerList: HeaderItem[] = [
  { title: "Blogs" },
  { title: "Socials" },
  { title: "Past Socials" },
  { title: "Clubs", children: [] },
  { title: "Contact" },
];

const defaultTagList: Tag[] = [
  { label: "Engineering", value: "engineering" },
  { label: "Production", value: "production" },
  { label: "Marketing", value: "marketing" },
  { label: "Design", value: "design" },
];

const initContent: { values: CreatePageBody } = {
  values: {
    title:
      "Web3 Founders & Designers Mixer + fireside chat with Coinbase Senior Designer & Airfoil founder",
    startAt: new Date(),
    venue: "Chelsea Market (163 W 20nd Street). Manhattan, NYC",
    capacity: 50,
    price: 30,
    description:
      "Calling all web3 founders and designers for an exciting night of exchanging ideas and making new friends! Make friends with fellow designers and founders in web3. There will also be lots of insights to be gained through an intimate chat\n+Q&A with two giants in the industry: \n\nPhil Hedayatnia, Founder & CEO of Airfoil, a\ngrowth design studio that has designed and built products in web3, the creator economy,\nthe future of work, and much more for 80+ startups since 2018 \n\nJihoon Suh, Senior\nProduct Designer at Coinbase, who was previously Senior Product Designer for Messenger\nfor Meta. \n\nThis will be a curated group with limited spots, so do sign up early!\n\nAbout\nAirfoil: \n\nAirfoil Studio is the design, branding, and engineering team helping web3 take flight. As one of crypto’s first large-scale design firms, we aim to design a friendlier\nfinancial layer for the internet. We’re a team of 85+ creatives, working from Airfoil’s hubs in\nToronto, Singapore, and Seoul, who’ve worked on 100+ projects since 2018, including\nSolana Pay, Drift Protocol, Bonfida Solana Name Service, Utopia Labs, Planetarium,\nLayer3.xyz, MarginFi, Hyperspace, VBA Game, and more.\n\nLearn more about Airfoil and\nour work at airfoil.studio.",
    isManualApprove: true,
    privacy: "Public",
    banner:
      "https://supermomos-app-resourcesus.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
    tags: ["Product", "Design"],
  },
};

let tagList: Tag[] = [{ label: "Engineering", value: "engineering" }];

export default function LandingPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const filterTagList: Tag[] = (() => {
    const valueList: string[] = tagList.map((item) => item.value);
    return (
      defaultTagList.filter((item) => !valueList.includes(item.value)) ?? []
    );
  })();
  const [content, setContent] = React.useState<{ values: CreatePageBody }>(
    initContent
  );

  React.useEffect(() => {
    fetch("https://api.supermomos-dev.com/interview/social/" + `${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setContent({ values: res });
        }
      })
      .catch((err) => {
        console.log("Not Found");
      });
  }, [params]);

  fetch(`https://api.supermomos-dev.com/interview/social/${params.id}`)
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        setContent({ values: res as CreatePageBody });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("done");
    });

  const startAtBreaker = React.useMemo(() => {
    const timeMachine = new Date(content.values?.startAt ?? new Date());
    const HH = timeMachine.getHours();
    const mm = timeMachine.getMonth();
    const dd = timeMachine.getDate();
    const yyyy = timeMachine.getFullYear();

    return {
      time: Number(HH) > 12 ? [HH - 12, "PM"].join("") : [HH, "AM"].join(""),
      date: timeMachine.toDateString(),
    };
  }, [content]);

  return (
    <>
      {/* PageContent */}
      <div className={styles.pageContent}>
        {/* Section Banner  */}
        <div className={[styles.grid, styles.infoContainer].join(" ")}>
          <div className={styles.col5} style={{ zIndex: 2 }}>
            <div className={styles.formHeaderContainer}>
              <span className={styles.formHeader}>{content.values?.title}</span>
            </div>
            <div className={styles.eventDate}>
              <div className={styles.grid} style={{ marginBottom: 25 }}>
                <div
                  className={styles.col6}
                  style={{
                    display: "flex",
                    paddingRight: 24,
                    alignItems: "center",
                  }}
                >
                  <span className="">
                    <Image
                      src={"/images/calendar.svg"}
                      alt={"calendar"}
                      width={33}
                      height={33}
                      className={styles.dateIcon}
                    />
                  </span>
                  <div className="div-group" id="datepicker">
                    <div>{startAtBreaker.date}</div>
                  </div>
                </div>
                <div
                  className={styles.col6}
                  style={{
                    display: "flex",
                    paddingRight: 24,
                    alignItems: "center",
                  }}
                >
                  <span className="">
                    <Image
                      src={"/images/clock.svg"}
                      alt={"calendar"}
                      width={33}
                      height={33}
                      className={styles.dateIcon}
                    />
                  </span>
                  <div className="div-group date" id="datepicker">
                    <div>{startAtBreaker.time}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.moreInfo}>
              <div className={styles.grid}>
                <div
                  className={styles.col12}
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    paddingRight: 24,
                    alignItems: "center",
                  }}
                >
                  <span className="">
                    <Image
                      src={"/images/environment.svg"}
                      alt={"calendar"}
                      width={33}
                      height={33}
                      className={styles.dateIcon}
                    />
                  </span>
                  <div>{content.values?.venue}</div>
                </div>
                <div
                  className={styles.col6}
                  style={{
                    display: "flex",
                    paddingRight: 10,
                    alignItems: "center",
                  }}
                >
                  <span className="">
                    <Image
                      src={"/images/group.svg"}
                      alt={"calendar"}
                      width={33}
                      height={33}
                      className={styles.dateIcon}
                    />
                  </span>
                  <div>{content.values?.capacity}</div>
                </div>
                <div
                  className={styles.col6}
                  style={{
                    display: "flex",
                    paddingRight: 24,
                    alignItems: "center",
                  }}
                >
                  <span className="">
                    <Image
                      src={"/images/dollar.svg"}
                      alt={"calendar"}
                      width={33}
                      height={33}
                      className={styles.dateIcon}
                    />
                  </span>
                  <div>{content.values?.price}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={[styles.col7, styles.bannerContainer].join(" ")}>
            <div
              className={styles.addBanner}
              style={{ backgroundImage: `url(${content.values?.banner})` }}
            ></div>
          </div>
        </div>
        {/* Section Description*/}
        <div className={styles.grid}>
          <div className={styles.col6}>{content.values?.description}</div>
        </div>
      </div>
    </>
  );
}
