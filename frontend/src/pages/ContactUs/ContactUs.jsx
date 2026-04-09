import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        toast.success("Thank you for reaching out! We will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    }

    return (
        <div className='max-w-6xl mx-auto py-12 px-4'>
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">Have questions about your order or want to partner with us? Our team is here to help.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3 flex flex-col gap-8">
                    <div className="flex items-start gap-4">
                        <div className="text-3xl">📍</div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-200">Our Location</h3>
                            <p className="text-slate-400">123 Tomato Street, Foodie Valley, FL 33101</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="text-3xl">📞</div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-200">Call Us</h3>
                            <p className="text-slate-400">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="text-3xl">✉️</div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-200">Email Support</h3>
                            <p className="text-slate-400">support@tomato.com</p>
                        </div>
                    </div>
                </div>

                <form className="md:w-2/3 flex flex-col gap-6 bg-white/5 p-8 rounded-2xl border border-white/10" onSubmit={onSubmitHandler}>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">Full Name</label>
                            <input className="bg-white/5 border border-white/10 p-3 rounded-lg outline-none focus:border-tomato transition" name='name' onChange={onChangeHandler} value={formData.name} type="text" placeholder="Your name" required />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">Email Address</label>
                            <input className="bg-white/5 border border-white/10 p-3 rounded-lg outline-none focus:border-tomato transition" name='email' onChange={onChangeHandler} value={formData.email} type="email" placeholder="Your email" required />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">Subject</label>
                        <input className="bg-white/5 border border-white/10 p-3 rounded-lg outline-none focus:border-tomato transition" name='subject' onChange={onChangeHandler} value={formData.subject} type="text" placeholder="How can we help?" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300">Message</label>
                        <textarea className="bg-white/5 border border-white/10 p-3 rounded-lg outline-none focus:border-tomato transition resize-none" name='message' onChange={onChangeHandler} value={formData.message} rows="6" placeholder="Write your message here..." required></textarea>
                    </div>
                    <button type="submit" className="bg-tomato hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition self-start shadow-[0_4px_14px_0_rgba(255,107,53,0.39)]">Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default ContactUs
