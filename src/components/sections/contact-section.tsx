"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import ScrollFloat from "@/components/ui/ScrollFloat"

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus('submitting')
    try {
      // In a real implementation, you'd send the data to your API endpoint
      // For now, we'll just simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFormStatus('success')
      reset()
    } catch (error) {
      setFormStatus('error')
      console.error("Error submitting form:", error)
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          {/* <Badge variant="outline" className="mb-2">
            Contact
          </Badge> */}
          <ScrollFloat
            containerClassName="text-center"
            textClassName="font-bold"
            scrollStart="center bottom+=60%"
          >
            Get in Touch
          </ScrollFloat>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Feel free to reach out to me for collaborations, opportunities, or just to say hello!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Contact Information Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="h-full">
              <CardContent className="p-6 space-y-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold">Contact Information</h3>
                
                <div className="space-y-4 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground">Hyderabad, Telangana</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-muted-foreground">+91 9390428814</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">bharadwajreddy1463@gmail.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3"
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium mb-2 block">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      {...register("name", { required: "Name is required" })}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="text-sm font-medium mb-2 block">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      rows={5}
                      {...register("message", { required: "Message is required" })}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'idle' && (
                        <span className="flex items-center gap-2">
                          <Send size={16} />
                          Send Message
                        </span>
                      )}
                      {formStatus === 'submitting' && 'Sending...'}
                      {formStatus === 'success' && (
                        <span className="flex items-center gap-2">
                          <CheckCircle size={16} />
                          Message Sent!
                        </span>
                      )}
                      {formStatus === 'error' && (
                        <span className="flex items-center gap-2">
                          <AlertCircle size={16} />
                          Error - Try Again
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}