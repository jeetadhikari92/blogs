import React from "react"
import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { BsFacebook, BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs"

export const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg md:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Cool
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.jeetadhikari.com"
                  target="_blank"
                  rel="nonopener noreferrer"
                >
                  About Creator
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/jeetadhikari92/blogs"
                  target="_blank"
                  rel="nonopener noreferrer"
                >
                  Source Code
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.jeetadhikari.com"
                  target="_blank"
                  rel="nonopener noreferrer"
                >
                  Something
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/jeetadhikari92/blogs"
                  target="_blank"
                  rel="nonopener noreferrer"
                >
                  Something else
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.jeetadhikari.com"
                  target="_blank"
                  rel="nonopener noreferrer"
                >
                  Privacy policy
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/jeetadhikari92/blogs"
                  target="_blank"
                  rel="nonopener noreferrer"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Jeet Adhikari"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://www.facebook.com/jeet.adhikari.7/"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.linkedin.com/in/jeet-adhikari-645447136/"
              icon={BsLinkedin}
            />
            <Footer.Icon
              href="https://www.instagram.com/jeetadhikari/"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="https://github.com/jeetadhikari92"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComponent
