"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import { motion } from "motion/react";

export function BlogsSection() {
  const blogs = [
    {
      title: "Jenkins Docker Agents",
      url: "https://bharadwajreddy1406.hashnode.dev/jenkins-docker-agents",
      imageSrc: "https://cdn.hashnode.com/res/hashnode/image/upload/v1707293444983/9a1e8c7a-5b5c-4a3a-8f5c-9c9f9f9f9f9f.png",
    },
    {
      title: "Learning GitHub Actions",
      url: "https://bharadwajreddy1406.hashnode.dev/learning-github-actions",
    },
    {
      title: "Virtualization DevOps",
      url: "https://bharadwajreddy1406.hashnode.dev/virtualization-devops",
    },
    {
      title: "Proxy Paradigms",
      url: "https://bharadwajreddy1406.hashnode.dev/proxy-paradigms-forward-and-reverse-proxies",
    },
  ];

  // Duplicate blogs for seamless marquee
  const marqueeBlogs = [...blogs, ...blogs, ...blogs];

  return (
    <section id="blogs" className="py-20 w-full overflow-hidden bg-background">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <h2 className="text-3xl font-bold mb-4 text-foreground">Latest Blogs</h2>
            <p className="text-muted-foreground">
            Check out my latest technical articles on Hashnode.
            </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
         {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

        <motion.div 
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }} // Adjust duration and distance based on content width
            transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 20 
            }}
        >
            {marqueeBlogs.map((blog, idx) => (
            <div 
                key={idx}
                className="shrink-0"
            >
                <div className="p-4 rounded-xl border border-border bg-card hover:bg-accent/5 transition-colors duration-300 w-[300px]">
                    <div className="mb-4 h-32 w-full bg-muted rounded-lg overflow-hidden">
                        {/* Placeholder for blog image if dynamic isn't available, or LinkPreview handled it */}
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
                            📝
                        </div>
                    </div>
                    <LinkPreview
                        url={blog.url}
                        className="font-bold text-lg text-foreground hover:text-primary transition-colors block text-wrap"
                    >
                    {blog.title}
                    </LinkPreview>
                    <p className="text-sm text-muted-foreground mt-2">Read on Hashnode ↗</p>
                </div>
            </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
