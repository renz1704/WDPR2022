import "../styles/FooterStyle.css";
import {facebookSquare} from 'react-icons-kit/fa/facebookSquare'
import {instagram} from 'react-icons-kit/fa/instagram'
import {youtubePlay} from 'react-icons-kit/fa/youtubePlay'
import {twitterSquare} from 'react-icons-kit/fa/twitterSquare'
import {linkedinSquare} from 'react-icons-kit/fa/linkedinSquare'
import {phoneSquare} from 'react-icons-kit/fa/phoneSquare'
import {envelopeO} from 'react-icons-kit/fa/envelopeO'
import {mapMarker} from 'react-icons-kit/fa/mapMarker'
import { Icon } from 'react-icons-kit'

export const FacebookIcon = () => {
    return (
            <a target="_blank" id="facebook" href="https://www.facebook.com/laaktheater">
            <Icon icon={facebookSquare} size={40}/>
            </a>
    )
}

export const InstagramIcon = () => {
    return (
            <a target="_blank" href="https://www.instagram.com/laaktheater">
            <Icon icon={instagram} size={40}/>
            </a>
    )
}

export const YoutubeIcon = () => {
    return (
            <a target="_blank" href="https://www.youtube.com/watch?v=xYhYPln42dg">
            <Icon icon={youtubePlay} size={40}/>
            </a>
    )
}

export const TwitterIcon = () => {
    return (
            <a target="_blank" href="https://www.twitter.com/laaktheater">
            <Icon icon={twitterSquare} size={40}/>
            </a>
    )
}

export const LinkedinIcon = () => {
    return (
            <a target="_blank" href="https://www.linkedin.com/company/laaktheater">
            <Icon icon={linkedinSquare} size={40}/>
            </a>
    )
}

export const PhoneIcon = () => {
    return (
            // <a target="_blank" href="https://www.linkedin.com/company/laaktheater">
            <Icon icon={phoneSquare} size={40}/>
            // </a>
    )
}

export const EmailIcon = () => {
    return (
            // <a target="_blank" href="https://www.linkedin.com/company/laaktheater">
            <Icon icon={envelopeO} size={40}/>
            // </a>
    )
}

export const MapIcon = () => {
    return (
            // <a target="_blank" href="https://www.linkedin.com/company/laaktheater">
            <Icon icon={mapMarker} size={40}/>
            // </a>
    )
}


const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h3>Contact</h3>
            <ul className="list-unstyled">
              <li><PhoneIcon/> <a href="tel:+070 393 33 48" target="_blank" >+070 393 33 48</a></li>
              <li><EmailIcon/> <a href="mailto:info@laaktheater.nl" target="_blank" >info@laaktheater.nl</a></li>
              <li><MapIcon/> <a href="http://maps.google.com/?q=Laaktheater Ferrandweg 4-T 2523XT Den Haag " target="_blank" >Ferrandweg 4-T 2523XT Den Haag</a></li>
            </ul>
          </div>
          <div className="col">
            <h3>Openingstijden</h3>
            <ul className="list-unstyled opening">
                <li>Maandag: 10:00 - 18:00</li>
                <li>Dinsdag: 10:00 - 18:00</li>
                <li>Woensdag: 10:00 - 18:00</li>
                <li>Donderdag: 10:00 - 18:00</li>
                <li>Vrijdag: 10:00 - 18:00</li>
                <li>Zaterdag: 10:00 - 18:00</li>
                <li>Zondag: 10:00 - 18:00</li>
            </ul>
          </div>
          <div className="col">
            <h3>Over ons</h3>
            <ul className="list-unstyled sm">
                <FacebookIcon/>
                <InstagramIcon/>
                <TwitterIcon/>
                <YoutubeIcon/>
                <LinkedinIcon/>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
