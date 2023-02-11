import { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import axios from "axios";
const ProfileComponent = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData("userInfo");

  const getPostsByUserId = async () => {
    return await axios.get(
      `http://localhost:8080/posts/user/${userInfo.id.toString()}`
    );
  };

  const data = useQuery({
    queryKey: "UserPosts",
    queryFn: getPostsByUserId,
    enabled: !isEmpty(userInfo),
  });

  const onDeleteHandler = async (id) => {
    await axios.delete(`http://localhost:8080/posts/${id}`);
    queryClient.invalidateQueries({
      queryKey: "UserPosts",
    });
    queryClient.invalidateQueries({
      queryKey: "POSTS",
    });
  };

  const onMarkAsClosed = async (id) => {
    await axios.put(`http://localhost:8080/posts/mark-as-read/${id}`);
    queryClient.invalidateQueries({
      queryKey: "UserPosts",
    });
    queryClient.invalidateQueries({
      queryKey: "POSTS",
    });
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      setPosts(data.data);
    }
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (typeof cachedData !== "undefined") {
      setUserInfo(cachedData.data.info);
    }
  }, [JSON.stringify(cachedData)]);

  return (
    <div className="w-11/12 mt-32">
      <div className="flex justify-center pb-10">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRISEhUVEhgYGBkYGBgYGBgYGBgSGBgZGhgYGBgcIS4lHB4rIRkYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjQkJSQ0NDQ0NDY0NDQ0MTQ0MTQ0NDQ0NDQ2NDQ0NDE0NDQ0NDQ2NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALEBHAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYABwj/xABGEAACAQIDAwcIBwUIAgMAAAABAgADEQQSIQUxQQYTIlFhcZEyUnKBkqGx0RUjQlOCwfAHFBay4SQzNENiotLxwuIXc6P/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAkEQACAgICAQUAAwAAAAAAAAAAAQIREiEDMUETIjJRgQRhkf/aAAwDAQACEQMRAD8A9EJnAyHNFzTjs6KJgZmuXx/sr+kv8wmgDTN8v3/sv41+MI/JCa0zB8nP8TQ9P/xM9loDor3Txrk8f7TQ9L8jPYsO3RXulcvy/Agvb+hF4oaRZp2aRY6Jw8UVJBmih4WOggVI4PBs8XNCwoKDiLmEFDxweFhQTedeDZoueFioJnXg4eLnjsKCJ0gDzs8LCgi04CQZ44VIWFE1pnuVeiD0vyMvOcmY5UYi6svmt8VMTYJHkVXe3efiZ79s0HmqXoL8BPAam9u8z3vZj/VUvQX4Ca8ngiC7DM07NGho4GZWXQ4NOBiTssLEPDxc8jymLlMLFSJc07NIrGdaPIWKJrxbyCdeLIMTPZot5Dmjc8DWgnNM1y+N8N3Ovxl6Hme5dP8A2b8a/GOPyQSXtZi+T5/tNH0vyM9doP0V7p5BsM/2il6X5GesYd+ivdK5fl+Ecfx/QvNOzSHPOzzM0J88XPIA8pdu8qsPhOjVcs5FxTUBntwJ1AUdrERpN9A6XZog8XNPKMZ+1CqWtQw9NBffUZnJHcuQA9lzEw/7UKw/vKNJ/RLJ7yzSvSkR6kT1jNFzzE7L/aHhqhC1A9Amwu1nS5/1LqO8qBNYlYMAykMDqCCCCOwjfIcWuy00+gsPFDwbPFzRDoKDxc8FDxecgFBYeLngfOReciCgvPOzwTnIvOQCgsPMzyrp5VZ7+Vw6rKZd85M/yse6L+L4GNdg1o8sb7Xrnu+zG+qpegvwnhHCe4bNf6ql6C/Cbc3gy4vJY55wqQdqkj5yc7NlGw8VYoqyv52OFSTkx4IPFWPFSV4qRRUhmyXxliHnZxAVqRc8MxemG5xE5wQPNEzxZh6Zn2qRhqQVqvbGfvAO4zqxIyDRUmf5bPfDgf61lqKkoeWT/UL6YlRjtClLTMzsU/X0vS/Iz0HGbQNNEI6hPPNkH66n3n4Ga3bT9BO4SnG5EqVQCF5RHiJYbP2tzhtMUZbcnm6Zly441oiM3ewvlrymOFpBaZ+uqXCG18ibi5HXwAPG51AInjtTFMxZmJZmJLMxLMxPEsdSe2aDl7iy+Kq3PkkIOxVUaeJY+uZcCEIpIcpWyQMToJOuFfgJNs/D65juml2dTQkA2uYpTrouHHl2ZenQddSHHcCZoOT3Kmpg3B6T0mN3pm4B63TNub3HceBGx2fg0tZ1HYZHyh2MjUKgABKgsttDnUZgL8L2K+uZeremjR8OO0zb064YKym4YAg9akXBkmeUewq6fu+HFNrqKSBevKEAF78ZY85JcBqQXni54JzkXnIsR2FZ4ueC552eGIWFZ4uaC552eLEdhWaUPKl+in4v5TLTPM/yqqaU/wAX8sajsUnowBOhntOzW+qpegvwnio3T2LZz/VU/QX4TTkV0Z8Xksi0gzRvOSB31mEonRFhOaODQQVIoqSHEtBgeODQQPHq8hoqgsNHhoGHk6tIboTiS5p2aMBi3kWTR42+16nFr3iYDaL5wMx1Mrqp7ZJgGGdb6T3GkeWmzfo+glLytf6lfTEsExSWHTXxEpeU+JVkVVYHpA6GZpGjZUbKP1tPvPwM1G136CdwmU2ebVEJ/Wk020nUonSB0HEQXyB/ErkS9hrcyy2Jo5lbzu4gjTdD9j1RnJLDxmkujOPZlOVeEQ4msTdiWLcRYECw7+/smeOEs4W9wePZNRytRGxNQZt4VrdlradcprdIdgt1bpjk0dOMWkSUcITYB207berSFJhBmHOKRuFwDvA33EZhG1BmtohTTziylVuWNrWHXM3JpmseNNWHNsd8GKVVMQMThqwUrnPSXNltYnh0huPbBsbtpEzrUp1aY6SZ2VsufdlJI0Mq8BiqlY827uUyOiLrZQ2Y3VdwOv5S+TaOIp4fE4YCnVWozsrMxR0z2uq6b73N94J3GL2ylsKlGOtlFsOs9KjSW5BCjTtml2Vjmc2YzK0yyXWoAp4DXQdVyATx4S22HiBnOoHrnTJLE402pUat6thcwP6UW9hGY+sMh1HiJm8PU6Y149chRTRpKTTo2qvxiipAkqCw6Q8RH84OseIkUa7C88UPBOcHWPEQbHY4IM1wfXFQ7otM0zvKt/7v8XwkD8obg2EqsftE1ct9Mtx7o4xdkSmmqKVd09c2e31VP0F+E8jXdPWcAw5unqPIXj2RyFx+Qu8hrHWOzDrHjKrH7XRLg8JnV9G2SXZYB48NMrX5TKp0F4qcqB1GS+OX0UuWP2axWkitK7ZmMFVM4ge0NurTJUamZYNukb5RSts0SwhBMphuU6Ea6GOPKm32SZD4Z/QnywrtGuRJLzJ6j4TJ7P5aIGu6Nl4kWJHba8uf44w3VV9kf8pHoy8powlyO9bPEhEMXSwkjGwHRE9ZqjiTshMjTeZZ0KwA1QHvjcYwKghFU9ggMFfdOvH0lBIB1mh2jQQKlkUaDh2RLboHpWZ0RQe2WGRfNEssBTpC7VAgUWuW3C+mp9cpxolOylweHpljVqjMFNJLdj1AW/2o8pqlQu7ud7MSe8m5mm5T1qQpqtKwLPcgAr5IIBseq7e1MkGtMZbOiKpB9AaiXuMZeZ5ps3Ssbjs3X9fwmbpVxcS5rF6ijoCovV6tZnJbRtCWmgjYtGujhldHBJVVfQAMLN0gDwMO5c7TFOjkGjuQF6wAQWPdp7xBNj4HKwem1RE3mm/Bwfsm5uNJmOVeM56uzA3Vegvbbew7zfXsEIxuYcksYl/sjlBUfD3elTr5KlNGNRrsRUzZQgbU+Qb23aGWFTZaNmWmxSuEFQ0ASwVSM2TMdc2WxsesdczOCK08NSSoGPOlqjWtmC3CIRf0WIkuycUqVkqUzU0YG5e7nXjlG+3CaSVPRlH3LZPmPWfEzpbbfwiU67BRZXAdRusH3j1MG0lO3lWE0StWc8ni6Y/Mes+JiZz5x8TFdReaHYeDpst3RW74SVKyovJ0Z3OfOPiZxcneSfXNu2zsONSiSq2rToZbU0UHskJ2+i5RpXZnJDXPxhgVddIO6Lpe2/rl0ZWKm6cld+DuPxH5zlYa6jxm32dhMIUUsiE2F7232kydGkY35MaMS/nv7TfOMLk7yT3kz0JdnYMi+Sn7pn8ZhMNnIXIB6Q+cIuwkqV2ZuLC9qUERhktY9RvBsi23++XRnY5MU66K7qOxiJG9RibliT1kzWbA2Vh3p5qihjbiZTbVwlNHZU0HfMoyTk0kbzg1FNvRVZj1mO5xvOPjDMPhEbfcjvktTBIN1/Ga0YWVodvOMXnG84+MKGFXW9/GSfuKdvjDEMiqfFJTANRTUJ8lLlQbDUsw1sNBYWJvvFtW/vdwMyp6swA7B0vjeVePrXZDwF/yhLTWMcpUQ3jGyxTGLbQHvBB/IfGRVtoJaxz+yv8Aylc9pC7dpPrly4WvIlyWWS7VpqQbObf6R/yhmL5V03AGRxYf6fnM0VX7RIHYAWPcD+ZhVLE0ltzaEHzmszeo2sPUBMsaZd2g8beJ8mix7S1h45ZFtXbDvTWmVCZukwBv0dygnr3n1iRHFMd5zDt1+MFrgHU38N39IxJIJ2dtcqBTrDnE4X1K93G3dr8Ja4jZAdRUoNcHUAm49TfPxmaejbUajrGsstjbSfDsD5SX6SdfaOozNxstSaEfDsps6lD28e48Zb7H2mKYZX3nceHjNVX2rhThXqhUq3GVVIBPOm3RZd4y3DHs3XJW9JsrF0mpV8OUW1VChYi7oSDkcecA1jobG3C2k4ZaLXJjsditpFzlTS41O7f1fOBYjZ6spIUX4qR0WH5HtEz9PE1KZKMSrIbEb9R7j3w/C7dqb3swsBYWHr/XVHHjSVImXI27YTQwyuebe4suVbknKF3AX4aDxPXIcNQNN7HgR69ZO+KVyHQ2YcDoT3dZktIO5WpkZhpqFJBsO6Zyi0zeMotI1XK1M1DD1x9noN3MLi/cVt+KZFKmt5tsITiaYwgpls2XymyBMrBrknXhwBMx22cKmHxNegrZ1RyoPG3AHtG49oMvjk0qMuaKcrTI2qQuhj3UdA5Ru3A3PE6+HqgFOzHT1ydjOzhgpbaOTkljpBZ2lVOhYEdqr8orYpgxFqbWO8ILHtGgMCWpbdONTsHv+c6MI/S/wyyl9horBiL06XeSyDxzgCU608O7sBQTrY5q1hf8e+FP0gVuy36iPzBiYTDqi5VvqbknUk9tpOEb0lRWTrs76Jw5/wAseo1L+9zAcTsBcx5trL1EXsew33S8oLxPq+clyzn5sU6ii4OXbZmhyePnj2f6zv4dPnr7P9ZpQkXLMqNMjM/w+3nL7P8AWcOT7eevs/1moCR4QQoMjKDk43nr7P8AWR4rYTIj1CykKL2y2vNfkgHKB7Yep22H+4RUCkwLYNXLTpjh0v5jLOriheUuzv7un3H4mEkybKoMGIUki8I5wdcoE8oyXnD1x5Coo8SOj3EeG78xDcPqitca3BHEMtt/YQR4GROLEg6j4iR4Q2LoeGo7SvzW58JcJYyTE1aodiWtBc51/XfCMVA3Oh/XUJ0cr2TBaGE31ir3xoMcBOY0JqbkSe94KhhB1HbvHbaMBCltRp8D3ichG7ySeHA9xjkYEA9cVqdxaAElByh4kaZlvbMAd19bHfrY2vNPi6CKtHFYZw9NlKkMqq6PTAZ6VULozlCSG+0AN9hMjRqEHI/qPX3yxwmKamTbySVLDrKk5T3i7a9TEcTF/YWXO3NnZ6IZE+tQrdr9JkT6t9O7mX/GeyZVwVJBFmGjD85udmVOcSyHpMgVifPem9IeL0KB72gPKyhzqLWRbshC5ha70GprUXN1lb7+onq1tx8oSZlUqdUT99qIWCVHUX3BjbXs3SBlvqsXC1gro7qHCsCyNuZRvB9UzZSLnY/Kmvh3WpcOR16eNt8Y9dqjPUbV3d3b0ndifeffIdspTbLXopzQdnD0wcyU3DEgI28qVIsDqCrDdaEbFplhm3gW8RpHCOTpCk6RY4enkUDidTFLTnPXIiZ6CSSpHJtvY6868ZeOEQx4ktMXPx7pEJKlQZTbXUi/aDb5yJzxVjjHJkxqagDTdp2Xk+YwGmbsIYJxt2bVQ5WMmVxIRJaSXuIWBIBFvEQaTiICEJlTykP1D96fzCWplPymP1Nut1/M/lBjXYLgf7un6Ik15Fhh0Kfor8JITYEngL+Eg0IF8tpJaUr0XIzkCx6W/XWW2EByLv3RUBY1uSWJJuFT21lNtfZdbCvSqVFUZr2ysGBKWuDbdoRL76ZqffN7UA21iGrUiHcvlOdbm+o0PuJjsVFRVpXzKuttV7VbVfiBK+qhFwf1+rQoP0Ea+qnIe43ZD/N4CNxg0Ujj1erT4D1GbOWUUJKmBgxQYwR4EzKHqQYRSHC/664OmklS9+qMRymzMO346yVHkeJFiD1j4f8AcYrwAnrUsw038I/DVMwIPlDQ/OMpPOrIQc67xvHWIwC8FjmouCp0upt2qwZfeBNBg9sl8q2AKqvRtv5tXvl6yQwFuCodZkazBgGX/rvkuFxRBXQFlNxfcbb1bsO6Ck0FWHbT2WafTQXUWR1HnKilnA6r5r9R91dQwBduiQFAuWO4DgO/snp1akjpnYHyQ9yLEgpa7DhmAynqemfOmNIVM1OkOjmY3O83Om/qFh6ouX2/pfHHJg2ztmuzmkF5xTlOYggZl3G19d7D1zZ7M2MlFM9TKpU3OcAIv4d0o9lbS5qolQ3IGhHZN/SShWFOvUUOtroDc2biwXdm7d845TlfdHVGEUurM/tTa+EZKlPmulkOQhMlqhHRYaAgA9e8dcyV5ouXDfW0hkygISDxILbj3W/3TN3np/xklBP7PP8A5Dbm0/A68cJGI9P++6bt0YUMxtbIjEGzEWXs4Fvl290IwFP6hPRBlPjqhYMe4AdQvoJGm1KqqEVgABYdEbhOKc8pWdEY4o0VFekP1whQmOXbNYa3HsiSDbtbrX2f6yB0a0wii4A7ZjBt+ta3RP4T85JS2/WGlk8D84MFE2SteOtMkvKSrxRPBvnJBynqeYni0LE4s1GSUXKsWpJ2uP5Wgy8qn+7T2j8oDtfbDV1VSgTKc2jE30I6u2OxpMs6S2RPRX4CD4usMjKDqRbt10OnjCD5IHYPhKequZj324/kD2yFsoQO7Wp3GuUDS2/dcz0ihyVw4UZcYbf/AF9WnX2TzN19/D9CekclMMUw1MajNd7dQY3HutFJN9OhqSXizPVcLhv8rEFz1Gm+p7GsBAubJ4dXV1yOng6ytbJ686EeIbt3b5aps1wMzMEA3k6Ze8/lvlsRlWpZHqUjx0Hf5Sfl4yLNmUDjr4foHxlnt5VujoSbDKSRa5uSCBwG/fr3bpUCpZie2/jr8ZUWJkTLYxRHVjc3/X63RBAZwj1J640mJfr8ICCtGFrX/LtvBQbEjq0kqVDGkLck8YAOpNC1OkCuBuB9c5HgA7mWuSLAHrOkN2Zs8VaiU81r6kjgo3kX3/1gLOTLHk8+Wup3aHw0ifQ0bTa1ArhlRGcinl3npMgAVsxFtNFNutb79ZmAZtlIYWOoIsR1gjWY/F4RqbvTbgeietDqp8Pfec8re2b8b8A+abvkVtEOnMMACo6J6+u8wpX1wnB4p6V2pnKxFsw4A77dsceGU+kVLljDthvKTE58TVIYsqtkW/UosbdmbMfXKy8QmJeepCOMVFeDzZSyk39j7y02ZXwKof3hszkm6h8oUDcDbUnfxk3JXZa1qnOVc3NpvsAc1Teq6kaDefUOM2rbNwp+w3sL/wApz83Ivia8cPJisc2zXQpTKUzpZsyXBHaTc+uUx2bQPk4iie90/IT0ersbDEaIL9qLbxuYKeT+HP2Kfsj5TnTSNXswX0Oh3VsOfxj8on0ATueifxf1m7PJfDH/AC6fsL/xjTySw3mU/ZHyhYqMP/DbcGpn1/8AtF/hl+GTx/8AabQ8jsKfsr4SM8icKfsr/u+cLHRjjyYqdSnuJ+cQ8l6vUPaM1/8AAuG4C3czj/ynfwPRG52Hc9T5wsKMhU5L1FNqgWnoDdnHksLg7uqT7G5LJiKq0UrXJIzlctlXidT0tL6DWbBeSFEWu2e3nszfzXhVLYgRlamUQqQQdSQRqCNIpN1oFV7BuUnI2lhcNWxPPu2ReiCqgF2IVASOF2E8rLdVj4T6H2ntBKlKpTS6swtdlRl3i9wbg6X4TDYrkotRiz8yTYC4QJoL8EUDjI4m0vcVPG9HmSrc/wDU9lwVBDTQ0z0cq5dPs5Rl91pnl5FopuOb8X+U09OkiKqX8kAeAtNGySmTZdKkMwRVIFxlABPgOiO3fMdjsW7scx0BOVRoo4aDie06y+5QbdXM9OkQx1DNvAPEDrPumXELERVkzh18O/S3vlG/Ay+U9JvV8BKrH0srsOB6Q9e/33jQMGI4fr9b4kVd0U9fjLYhp4RV3xWERezWIY6dJv3V8pfI4Ub2KkAesyC8YjoonRLxDFk+BrZHRtwB17jofjB7zrwA9N2W/R37v0LQzEhHyPUyDILBntbLe9iT7vX1zzyltuoqoiAA2ALHXdv03brQOvWeqemzP2sSQO4bhIwKyotqtZRmsysASLg5t17bu6Qtjqfn3PUFb4kCCJhdUWn5ZIUf6ixAAPrja2HF8rg02037joGFjuOhB9YnT6sjD00FjFqdwY+ofOF812yrwwCMDUOg3WBNzw7oadp0vOPsmRLml4KUIlzhtsVqaLTplVUbugpNybkkkamSfxDifPX2E+UofpOn1nwM76Sp9Z8Ji03s0NAOUeJ89fYX5Tv4kxPnr7C/KUlHFI98tzbfpJQZNAXLcpMSPtp7CzT7PFZ6VOoati6KxARLAsAbbpgmm22VtaglCijOAyogIs2hCi43QAP/AHer99/sT5Tv3et99/sT5Rn01h/vB4N8p30zQ+8Hg/yj0A/93rfe/wD5pE5it96PYWN+maH3g9l/lE+maP3g9l/lFoB/NVvvR7Czuarfej2FjRtih94PBvlGnbFD7weDfKPQD+brfej2FjTTrfer7CyM7YoeePBvlIn2vR4OPBvlFoB7isP81fYEHetWBtzi+wPnI6m1afB/c3ygT7QW+/3H5RDNc/JjCH/IS/ZcfCR/wlhPuvBm+ckTlLhjuqLCk2xRbdUQ+sTYgqqnI/Bgk5GHc7fOQVeQ+De10fS/224y6baFM73XxnNtago/vE8RHoLZnz+z/AgEinUbsztGfwZhgdMKzelUPzlxU5SYYb6gPdA8RyyoDyczdwMLE02dhuS+HUj+yUF7zmMuqOzaKeRSpr3IJmH5cAeTSJ7yIi8snJH1QA7/AOkG7BJmn2rhg2HxACK5yMFWwsWI0988ZHJDGeYvrYT3KhXV8OannLf1zPu8TZR5d/B2L8xPbEUci8X5qe3PS3rKN7CdSroxCqwJO4CTYGF2X+zrFVWYM1OmAL3vmueq0kqfsyxqm16bDrDH4WnruBp5FA4nUwvPKA8Y/wDjnGDilurMflHJyExK6WQes/KexOx4RhcgawboKPIU5E4oOjhkGVlb7W9SCOHZLFeSeIZcjimwsBqzEaJTS/kb/q7/AIuzX0kYpR5REemKRjYEE9Uab8Dr+jyOlyDxK6GojDqIY++Nf9nFYm61EXsysfCewVN0YPswJPJ6P7Mqv2qqkdQUj3y3wf7Oz5LOiDrKFte25no4iESWrGmYil+zZeFdB3UrfnAX5EuA1qq3G4ZDYnxnpeGOsqqqkO/pH4yGqZTZ5JjsG9FilRSp9xHWDxmx2fs+kaVIkA3RDu61EvsfgaddClRQw4HiD1gwP9yNJUUdJVUKD2KANfCFCsH+jqXmjwnfR1LzR4STPEzwoBn0dS80eEQ7Pp+aPCSGpGmpCgIm2fT80eEY+Ap9Q8JI9WQNWiAhqYBOoQKrg04WhVStBKlWIYHVw9t1vGQ5D1DxhDvGZoAU6xs6dNRExkJnTohCyRZ06UMlXhDKfCdOiA9A2f8A4Kn3SprTp0TEVWOi8mf8QnrnTogPRH4x6bhOnSxDoyrOnRS6KXZTY7fIdlf3nqizo49Gj6NC26RPOnRmIh3SMzp0QwnDbxBsZ5Td5nTpL7DwDCSVPIPdOnRAZ598bOnRDEMYZ06AELwd506AA9SC1J06IZCYk6dEB//Z"
          className="h-40 w-40 rounded-full object-cover"
          alt="username"
        />
        <div className="ml-10">
          <div className="flex items-center">
            <h2 className="block leading-relaxed font-light text-gray-700 text-3xl">
              {userInfo.first_name && userInfo.first_name}&nbsp;
              {userInfo.last_name && userInfo.last_name}
            </h2>
          </div>

          <div className="">
            <span className="text-base">
              {userInfo.email && userInfo.email}
            </span>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300"></div>
      <div>
        <h2 className="block leading-relaxed font-light text-gray-700 text-3xl">
          My Posts
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: "5px",
            columnGap: "5px",
          }}
        >
          {!isEmpty(posts) ? (
            posts.data.map((d) => {
              return (
                <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <div class="p-3 flex justify-end">
                    <button
                      onClick={() => {
                        onMarkAsClosed(d.id);
                      }}
                      class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                    >
                      <span>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        >
                          <path d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z" />
                        </svg>
                      </span>

                      <span>Mark as Closed</span>
                    </button>
                    <button class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </span>
                      <Link to={`/post/update?id=${d.id}`}>
                        <span>Edit</span>
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        onDeleteHandler(d.id);
                      }}
                      class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </span>

                      <span>Delete</span>
                    </button>
                  </div>
                  <div class="flex flex-col items-center pb-10">
                    <img
                      class="w-24 h-24 mb-3 rounded-full shadow-lg"
                      src="https://img.freepik.com/free-photo/carpenter-cutting-mdf-board-inside-workshop_23-2149451051.jpg?w=2000"
                      alt="Test Image"
                    />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {d.title}
                    </h5>
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">
                      {d.price}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {d.description}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <h5>No Posts</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
