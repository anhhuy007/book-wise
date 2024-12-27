import { Mail, Phone, MapPin } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hình ảnh ngang lớn */}
      <div className="mb-8">
        <img
          src="https://i.pinimg.com/1200x/d9/fa/90/d9fa900f0cbfc26c8f151bfa1df08132.jpg"
          alt="Đội ngũ của chúng tôi"
          className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* Thông tin về website */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Giới thiệu về Nền Tảng Sách Trực Tuyến của chúng tôi
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Chào mừng bạn đến với nền tảng sách trực tuyến của chúng tôi, nơi
          chúng tôi cố gắng kết nối bạn đọc với cuốn sách tiếp theo yêu thích
          của mình. Sứ mệnh của chúng tôi là tạo ra một cộng đồng sống động của
          những người yêu sách, cung cấp một loạt các thể loại và tựa sách phù
          hợp với mọi sở thích và đam mê.
        </p>
        <p className="text-lg text-gray-700">
          Được thành lập vào năm 2023, chúng tôi đã nhanh chóng trở thành điểm
          đến ưa thích của những người yêu sách trên toàn thế giới. Nền tảng của
          chúng tôi không chỉ cho phép bạn khám phá và mua sách mà còn giúp bạn
          kết nối với những người đọc khác, chia sẻ đánh giá, và tham gia vào
          những cuộc thảo luận thú vị về văn học.
        </p>
      </section>

      {/* Thông tin về đội ngũ phát triển */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">
          Đội ngũ Phát triển của chúng tôi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Gia Bảo", "Hồng Minh", "Hiền Lương"].map((name, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <img
                src={`https://i.pinimg.com/736x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg`}
                alt={name}
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-center">{name}</h3>
              <p className="text-gray-600 text-center">
                Nhà phát triển phần mềm
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
          {["Anh Duy", "Anh Huy"].map((name, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <img
                src={`https://i.pinimg.com/736x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg`}
                alt={name}
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold text-center">{name}</h3>
              <p className="text-gray-600 text-center">
                Nhà phát triển phần mềm
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tầm nhìn và lý do phát triển dự án */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Tầm nhìn của chúng tôi</h2>
        <p className="text-lg text-gray-700 mb-4">
          Chúng tôi tạo ra nền tảng này với mục tiêu làm cho văn học trở nên dễ
          tiếp cận và thú vị hơn đối với mọi người. Trong thời đại số ngày nay,
          chúng tôi tin rằng sách nên chỉ cách một cú nhấp chuột và trải nghiệm
          đọc sách nên được chia sẻ và tôn vinh.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Đối tượng mà chúng tôi hướng tới bao gồm:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li>Những người đọc đam mê tìm kiếm cuốn sách tiếp theo tuyệt vời</li>
          <li>Các tác giả muốn kết nối với độc giả của mình</li>
          <li>
            Các câu lạc bộ sách đang tìm kiếm những tựa sách đáng thảo luận
          </li>
          <li>Học sinh và giáo viên tìm kiếm tài liệu học thuật</li>
        </ul>
        <p className="text-lg text-gray-700">
          Chúng tôi cam kết liên tục cải tiến nền tảng, thêm tính năng mới, và
          mở rộng bộ sưu tập để đáp ứng nhu cầu đa dạng của cộng đồng đang phát
          triển của chúng tôi.
        </p>
      </section>

      {/* Địa chỉ và thông tin liên hệ */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Liên hệ với chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Địa chỉ</h3>
            <p className="flex items-center text-gray-700 mb-2">
              <MapPin className="mr-2" />
              123 Phố Sách, Thành phố Văn Học, 12345
            </p>
            <h3 className="text-xl font-semibold mb-2">Thông tin liên hệ</h3>
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
            <h3 className="text-xl font-semibold mb-2">Giờ làm việc</h3>
            <p className="text-gray-700 mb-1">
              Thứ Hai - Thứ Sáu: 9:00 AM - 6:00 PM
            </p>
            <p className="text-gray-700 mb-1">Thứ Bảy: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-700">Chủ Nhật: Nghỉ</p>
          </div>
        </div>
      </section>
    </div>
  );
}
