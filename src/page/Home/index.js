// import { Link } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import ForkMeOnGithub from 'fork-me-on-github';
import StyledWrapper from './styled';
import Loading from '../../component/Loading';
import Darkmode from '../../component/Darkmode';
import Footer from './Footer';
import ModalWidgetList from '../../component/WidgetList';
import OpenButton from './OpenButton';
import { useWidgets } from '../../hooks';

// import Account from '../../component/Account';
const Setting = lazy(() =>
  import(/* webpackChunkName: "aside.setting" */ '../../component/Setting/index')
);

const WidgetSection = lazy(() => import(/* webpackChunkName: "block.widgets" */ './WidgetSection'));

export default function Home() {
  const { widgets, removeWidget, updateWidgetData, addWidget } = useWidgets();

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisible = () => {
    setModalVisible((prev) => !prev);
  };
  return (
    <Suspense fallback={<Loading />}>
      {process.env.REACT_APP_CHROME_EXT != 'true' && (
        <ForkMeOnGithub
          repo="https://github.com/Privoce/Portal-Lite-China"
          colorBackground="#4e6ef3"
          colorOctocat="white"
          side="left"
        />
      )}

      <Setting />
      <StyledWrapper>
        {/* <Account /> */}

        <Suspense fallback={<Loading tip="小组件模块加载中..." />}>
          {/* <DndProvider backend={HTML5Backend}> */}
          <WidgetSection
            widgets={widgets}
            removeWidget={removeWidget}
            updateWidgetData={updateWidgetData}
          />
          {/* </DndProvider> */}
        </Suspense>
      </StyledWrapper>
      <OpenButton openWidgetListModal={toggleModalVisible} />
      {modalVisible && (
        <ModalWidgetList
          addedWidgets={widgets}
          addWidget={addWidget}
          resetModalVisible={toggleModalVisible}
        />
      )}
      <Footer />
      <Darkmode />
    </Suspense>
  );
}
