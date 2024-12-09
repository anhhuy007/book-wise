import { Mail, Phone, MapPin } from 'lucide-react'

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Big horizontal thumbnail */}
      <div className="mb-8">
        <img
          src="https://i.pinimg.com/1200x/d9/fa/90/d9fa900f0cbfc26c8f151bfa1df08132.jpg"
          alt="Our Team"
          className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* Website info */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">About Our Online Book Platform</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our online book platform, where we strive to connect readers with their next favorite book. 
          Our mission is to create a vibrant community of book lovers, offering a wide range of genres and titles 
          to suit every taste and interest.
        </p>
        <p className="text-lg text-gray-700">
          Founded in 2023, we've quickly grown to become a go-to destination for bibliophiles around the world. 
          Our platform not only allows you to discover and purchase books but also to engage with other readers, 
          share reviews, and participate in lively discussions about literature.
        </p>
      </section>

      {/* Dev team info */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Development Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Gia Bảo', 'Hồng Minh', 'Hiền Lương'].map((name, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <img
                src={`https://i.pinimg.com/736x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg`}
                alt={name}
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-center">{name}</h3>
              <p className="text-gray-600 text-center">Software Developer</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
          {['Anh Duy', 'Anh Huy'].map((name, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <img
                src={`https://i.pinimg.com/736x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg`}
                alt={name}
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-center">{name}</h3>
              <p className="text-gray-600 text-center">Software Developer</p>
            </div>
          ))}
        </div>
      </section>

      {/* Web project reason and target */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 mb-4">
          We created this platform with the goal of making literature more accessible and engaging for everyone. 
          In today's digital age, we believe that books should be just a click away, and reading experiences should 
          be shared and celebrated.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our target audience includes:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li>Avid readers looking for their next great book</li>
          <li>Authors seeking to connect with their audience</li>
          <li>Book clubs searching for discussion-worthy titles</li>
          <li>Students and educators exploring academic literature</li>
        </ul>
        <p className="text-lg text-gray-700">
          We're committed to continually improving our platform, adding new features, and expanding our collection 
          to meet the diverse needs of our growing community.
        </p>
      </section>

      {/* Address and contact */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="flex items-center text-gray-700 mb-2">
              <MapPin className="mr-2" />
              123 Book Street, Literary City, 12345
            </p>
            <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
            <p className="flex items-center text-gray-700 mb-2">
              <Phone className="mr-2" />
              +1 (555) 123-4567
            </p>
            <p className="flex items-center text-gray-700">
              <Mail className="mr-2" />
              contact@bookplatform.com
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
            <p className="text-gray-700 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-700 mb-1">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>
      </section>
    </div>
  )
}