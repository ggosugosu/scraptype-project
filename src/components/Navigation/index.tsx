import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DropSettingItemStyle,
  DropSettingItemWrapperStyle,
  DropSettingsStyle,
  DropSettingsWrapperStyle,
  NavBarStyle,
  NavButton,
  NavButtons,
  NavDesc
} from 'components/Navigation/style';
import Image from 'next/image';
import iconTag from 'assets/images/ic_tag_default.svg';
import iconName from 'assets/images/ic_name_default.svg';
import iconSettings from 'assets/images/ic_settings_default.svg';
import iconFont from 'assets/images/ic_font.svg';
import iconHash from 'assets/images/ic_hash.svg';
import iconTagMobile from 'assets/images/ic_tag_mobile.svg';
import iconNameMobile from 'assets/images/ic_name_mobile.svg';
import iconSettingsMobile from 'assets/images/ic_settings_mobile.svg';
import settingsDropSVG from 'assets/images/ic_settings_drop.svg';
import logoLg from 'assets/images/logo_lg.svg';
import logoSm from 'assets/images/logo_sm.svg';
import logoBistro from 'assets/images/logo_bistro.svg';
import { useRecoilState } from 'recoil';
import { windowWideState } from 'components/Navigation/atom';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  const [width, setWidth] = useState(0);
  const [isWide, setIsWide] = useRecoilState(windowWideState);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const handleClickSettings = () => setOpenSettings(!openSettings);

  const handleChangePage = async (link: string) => {
    setOpenSettings(false);
    await router.push(link);
  };

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setIsWide(width > 480);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, setIsWide]);

  return (
    <NavBarStyle>
      <Link href="/" passHref>
        <Image src={isWide ? logoLg : logoSm} alt="Logo" className="logo" />
      </Link>
      <NavDesc>
        Before memorizing the names and
        <br />
        shapes of 10,000 fonts,
        <br />
        I&apos;m glad we were able to create this site.
      </NavDesc>

      <NavButtons>
        <li className={'nav-button'}>
          <NavButton onClick={handleClickSettings}>
            <span>Settings</span>
            <Image src={isWide ? iconSettings : iconSettingsMobile} alt="icon-settings" />
          </NavButton>
          {
            openSettings &&
            <DropSettingsWrapperStyle>
              <Image src={settingsDropSVG} alt="settings-drop" className="bg-settings-drop filter_main" />
              <DropSettingsStyle>
                <DropSettingItemWrapperStyle>
                  <Link href="/admin/font" passHref>
                    <DropSettingItemStyle>
                      <div className={'icon-wrapper'}>
                        <Image src={iconFont} alt="icon-font" width={24} />
                      </div>
                      <span>Font Settings</span>
                    </DropSettingItemStyle>
                  </Link>
                </DropSettingItemWrapperStyle>
                <DropSettingItemWrapperStyle>
                  <Link href="/admin/tag" passHref>
                    <DropSettingItemStyle>
                      <div className={'icon-wrapper'}>
                        <Image src={iconHash} alt="icon-hash" />
                      </div>
                      <span>Tag Settings</span>
                    </DropSettingItemStyle>
                  </Link>
                </DropSettingItemWrapperStyle>
              </DropSettingsStyle>
            </DropSettingsWrapperStyle>
          }
        </li>
        <li className={'nav-button'}>

          <NavButton onClick={() => handleChangePage('/search/tag')}>
            <span>Tag Search</span>
            <Image src={isWide ? iconTag : iconTagMobile} alt="icon-tag" />
          </NavButton>

        </li>
        <li className={'nav-button'}>

          <NavButton onClick={() => handleChangePage('/search/font')}>
            <span>Name Search</span>
            <Image src={isWide ? iconName : iconNameMobile} alt="icon-name" className="nav-icon" />
          </NavButton>

        </li>
        <li className={'nav-button'}>
          <Image src={logoBistro} alt="logo-bistro" />
        </li>
      </NavButtons>
    </NavBarStyle>
  );
}
