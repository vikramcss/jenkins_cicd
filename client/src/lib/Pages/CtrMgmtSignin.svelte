<script>
  import Alert from "../../common/Alert.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { api } from "../../api/api.js";
  import Fa from "svelte-fa";
  import { faRedo } from "@fortawesome/free-solid-svg-icons";

  const dispatch = createEventDispatcher();
  let alert = null;
  let username = "";
  let password = "";
  let captcha = {
    id: "",
    svg: "",
    text: "",
  }; //server response stored in it
  let passwordEl;
  let captchaEl;
  onMount(async () => {
    await getCaptcha();
  });
  async function checkInternet() {
    if (!navigator.onLine) {
      alert("Internet is not Active!!!. Please check your connection!!!");
    }
  }

  async function getCaptcha() {
    let { error, errorMsg, captcha: captcha_svg, id } = await api.getcaptcha();
    captcha.id = id;
    captcha.svg = captcha_svg;
    captcha.text = "";
    // let htmlelement = document.getElementById('captcha');
    // htmlelement.innerHTML = captcha;
  }

  const login = async () => {
    alert = null;
    if (!username || username === "")
      return (alert = "username cannot be null");
    if (!password || password === "")
      return (alert = "password cannot be null");
    if (!captcha.text || captcha.text === "")
      return (alert = "captchacannot be null");

    const { error, errorMsg, token, success } = await api.loginAdmin({
      login: username,
      password,
      captcha: { id: captcha.id, text: captcha.text },
    });
    console.log("login returned:", error);
    if (error) return (alert = errorMsg);
    return dispatch("loggedIn", { token });
  };
</script>

<main>
  <div class="grid grid-col-12 h-auto min-h-screen bg-navy-200">
    <div class="container mx-auto p-5">
      <div
        class="max-w-sm mx-auto bg-white px-5 pt-2 pb-3 rounded-lg shadow-xl "
      >
        <div>
          <img class="object-contain h-28 w-full " src="/PCBlogo.png" alt="" />
          <h1 class="text-center font-bold text-lg">
            Pune Cantonment Board Admin Signin
          </h1>
          <form autocomplete="off" on:submit|preventDefault={login}>
            <div
              class="mt-5 outline relative border-2 white focus-within:border-navy-500 rounded"
            >
              <!-- <div class="field_check" /> -->
              <input
                type="text"
                name="username"
                placeholder=""
                Id="username"
                bind:value={username}
                autocomplete="new-password"
                class="block p-2 h-full w-full  mb-0 text-lg appearance-none border-none focus:outline-none bg-transparant"
              />
              <label
                for="username"
                class="ml-5 cursor-text absolute top-0 mt-0.5 text-lg bg-white -z-1 duration-300 orgin-0 rounded "
                >User Name</label
              >
            </div>
            <div
              class="mt-5 outline relative border-2 white focus-within:border-navy-500 rounded"
            >
              <input
                bind:this={passwordEl}
                type="password"
                bind:value={password}
                id="password"
                name="password"
                placeholder=""
                autocomplete="off"
                class="block p-2 h-full w-full  mb-0 text-lg appearance-none border-none focus:outline-none bg-transparant"
              />
              <label
                on:click={() => {
                  passwordEl.focus();
                  console.log("password lable clicked");
                }}
                for="password"
                class="ml-5 cursor-text absolute top-0 mt-0.5 text-lg bg-white -z-1 duration-300 orgin-0 rounded"
              >
                Password
              </label>
            </div>
            <div class="mt-1">
              <h1 class="text-right text-sm">
                <a
                  tabindex="-1"
                  class="text-navy-700 underline hover:text-navy-500"
                  href="/forgotpassword"
                >
                  Forgot Password?
                </a>
              </h1>
            </div>
            <div
              class="flex mt-5 flex-col border-2 bg-white boarder-gray-500 rounded"
            >
              <div class="flex flex-row">
                <div
                  class="flex flex-row h-auto m-2 w-44 md:w-56 lg:w-56 xl:w-54 2xl:-54 bg-white captcha-back pt-2"
                  id="captcha"
                >
                  {@html captcha.svg}
                </div>

                <!-- class="flex border-none focus:outline-purple-none bg-none rounded-full mt-2 mr-2 " -->
                <div class="flex flex-row mt-3 h-14">
                  <button
                    tabindex="-1"
                    type="button"
                    class="flex justify-center  mt-2 my-2 mx-1 bg-white hover:bg-navy-50 focus:outline-none w-full font-bold "
                    on:click|preventDefault={getCaptcha}
                  >
                    <div class="h-6 w-6 text-navy-600">
                      <Fa icon={faRedo} size="2x" pull="left" />
                    </div>
                  </button>
                </div>
              </div>
              <div class="flex flex-row">
                <div
                  class="ml-2 mt-3 mb-2 outline relative border-2 white focus-within:border-navy-500 rounded"
                >
                  <input
                    bind:this={captchaEl}
                    type="text"
                    bind:value={captcha.text}
                    name="captcha"
                    placeholder=" "
                    class="block p-2 h-full w-full  mb-0 text-lg appearance-none border-none focus:outline-none bg-transparant"
                  />
                  <label
                    on:click={() => {
                      captchaEl.focus();
                      console.log("captch lable clicked");
                    }}
                    for="captcha"
                    class="ml-5 cursor-text absolute top-0 mt-0.5 text-lg bg-white -z-10 duration-300 orgin-0 rounded"
                    >Captcha</label
                  >
                </div>
              </div>
            </div>
            <div>
              {#if alert}
                <Alert
                  message={alert}
                  on:alertClosed={() => {
                    alert = null;
                  }}
                />
              {/if}
            </div>
            <button
              type="submit"
              class=" mt-2 w-full text-center bg-navy-600 hover:bg-navy-500  shadow-lg text-white font-bold py-2 px-4 rounded"
            >
              LOGIN
            </button>
            <button
              on:click={() => {
                dispatch("register", {});
                console.log("onClick clicked for register");
              }}
              type="button"
              class=" mt-2 w-full text-center bg-white  shadow-lg text-navy-700 hover:text-gray-700 font-bold py-2 px-4 rounded  border-2 border-navy-600 hover:border-navy-400 "
            >
              Don't have account ? Register
            </button>
          </form>
          <div class="mt-1">
            <h1 class="text-center text-sm">
              {"Helpdesk: 9028947883"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  .outline input:focus-within ~ label,
  .outline input:not(:placeholder-shown) ~ label {
    transform: scale(0.9) translateY(-25px);
    margin-left: 0.5rem;
    padding-left: 7px;
    padding-right: 7px;
    color: #4338ca;
    font-weight: bold;
  }
  .field_check::after {
    content: "";
    width: 16px;
    height: 8px;
    border: solid #36b37e;
    border-width: 0 0 2px 2px;
    position: absolute;
    right: 16px;
    top: 13px;
    transform: rotate(-45deg);
  }
</style>
