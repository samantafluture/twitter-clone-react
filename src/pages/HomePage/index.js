/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Cabecalho from "../../components/Cabecalho";
import NavMenu from "../../components/NavMenu";
import Dashboard from "../../components/Dashboard";
import Widget from "../../components/Widget";
import TrendsArea from "../../components/TrendsArea";
import Tweet from "../../components/Tweet";
import FormTweet from "../../components/FormTweet";
import NotificacaoContext from "../../contexts/NotificacaoContext";
import { useSelector, useDispatch } from "react-redux";
import { TweetsThunkActions } from "../../store/ducks/tweets";

function HomePage() {
  const { data: listaTweets, error } = useSelector((state) => state.tweets);
  const dispatch = useDispatch();
  const setNotificacao = useContext(NotificacaoContext);

  useEffect(() => {
    if (error) {
      setNotificacao(error);
    }
    if (!error) {
      dispatch(TweetsThunkActions.loadTweets());
    }
  }, [error]);

  const addTweet = useCallback(
    (textoTweet) => dispatch(TweetsThunkActions.addTweet(textoTweet)),
  []);

  const removeTweet = useCallback(
    (id) => dispatch(TweetsThunkActions.deleteTweet(id)),
  []);

  return (
    <Fragment>
      <Helmet>
        <title>Twitelum | {`${listaTweets.length}`} Tweets</title>
      </Helmet>
      <Cabecalho>
        <NavMenu usuario="@omariosouto" />
      </Cabecalho>
      <div className="container">
        <Dashboard>
          <Widget>
            <FormTweet addTweetCallback={addTweet} />
          </Widget>
          <Widget>
            <TrendsArea />
          </Widget>
        </Dashboard>
        <Dashboard posicao="centro">
          <Widget>
            <div className="tweetsArea">
              {listaTweets.map((tweet) => {
                return (
                  <Tweet
                    key={tweet._id}
                    id={tweet._id}
                    conteudo={tweet.conteudo}
                    usuario={tweet.usuario}
                    totalLikes={tweet.totalLikes}
                    likeado={tweet.likeado}
                    removivel={tweet.removivel}
                    removeTweetCallback={removeTweet}
                  />
                );
              })}
            </div>
          </Widget>
        </Dashboard>
      </div>
    </Fragment>
  );
}

export default HomePage;
