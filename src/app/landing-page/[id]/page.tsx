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

let tagList: Tag[] = [{ label: "Engineering", value: "engineering" }];
export default function Home({ params }: { params: Record<string, string> }) {
  const [content, setContent] = React.useState<{ values: any }>({
    values: {},
  });
  const filterTagList: Tag[] = (() => {
    const valueList: string[] = tagList.map((item) => item.value);
    return (
      defaultTagList.filter((item) => !valueList.includes(item.value)) ?? []
    );
  })();

  fetch(`https://api.supermomos-dev.com/interview/social/${params.id}`)
    .then((res) => res.json())
    .then((res) => {
      alert(res);
      setContent({ values: res as CreatePageBody });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log("done");
    });

  return (
    <div className={styles.pageContent}>
      {/* Section Banner  */}
      <div className={styles.grid}>
        <div className={styles.col5} style={{ zIndex: 2 }}>
          <div className={styles.banner}>
            <span className={styles.formHeader} style={{ marginBottom: 30 }}>
              {content.values.title}
            </span>
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
                  <div>{content.values.startAt?.toString()}</div>
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
                  <div>{content.values.startAt?.toString()}</div>
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
                <div>{content.values.venue}</div>
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
                <div>{content.values.capacity}</div>
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
                <div>{content.values.price}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner */}
        <div
          className={styles.col7}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            className={styles.addBanner}
            style={{ backgroundImage: `url(${content.values.banner})` }}
          ></div>
        </div>
      </div>
      {/* Section Description*/}
      <div className={styles.grid} style={{ marginTop: 30 }}>
        <div className={styles.col6}>{content.values.description}</div>
      </div>
    </div>
  );
}
